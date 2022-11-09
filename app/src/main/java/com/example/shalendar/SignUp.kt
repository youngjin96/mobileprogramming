package com.example.shalendar

import android.app.DatePickerDialog
import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.MotionEvent
import android.view.inputmethod.InputMethodManager
import android.widget.Toast
import com.example.shalendar.databinding.ActivitySignUpBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import java.io.BufferedReader
import java.io.DataOutputStream
import java.io.InputStreamReader
import java.lang.Exception
import java.net.HttpURLConnection
import java.net.URL
import java.util.*
import java.util.Calendar.getInstance
import kotlin.concurrent.thread

class SignUp : AppCompatActivity() {
    private var mBinding : ActivitySignUpBinding? = null
    private val binding get() = mBinding!!
    private lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mBinding = ActivitySignUpBinding.inflate(layoutInflater)
        setContentView(binding.root)

        auth = Firebase.auth

        // 뒤로가기 눌렀을 때 메인 페이지로 이동
        binding.buttonBack.setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
        }

        binding.editTextBirth.setOnClickListener {
            val c = Calendar.getInstance()
            val year = c.get(Calendar.YEAR)
            val month = c.get(Calendar.MONTH)
            val day = c.get(Calendar.DAY_OF_MONTH)
            val datePickerDialog = DatePickerDialog(this,
                { view, year, monthOfYear, dayOfMonth ->
                    val dat = (year.toString() + "-" + (monthOfYear + 1) + "-" + dayOfMonth.toString())
                    binding.editTextBirth.setText(dat)
                },
                year,
                month,
                day
            )
            datePickerDialog.show()
        }

        // TODO : 데이터베이스 연결하고 닉네임 중복 확인
        binding.buttonComplete.setOnClickListener {
            var email = binding.editTextEmail.text.toString()
            var password = binding.editTextPassword.text.toString()
            var repeatPassword = binding.editTextRepeatPassword.text.toString()
            var nickName = binding.editTextNickName.text.toString()
            var birth = binding.editTextBirth.text.toString()

            if (email == "" || password == "" || repeatPassword == "" || nickName =="" || birth == ""){
                Toast.makeText(baseContext, "모두 입력해주세요.", Toast.LENGTH_SHORT).show()
            }
            else if (password.length < 6) {
                Toast.makeText(baseContext, "비밀번호가 6자리 미만입니다.", Toast.LENGTH_SHORT).show()
            }
            else if (password != repeatPassword) {
                Toast.makeText(baseContext, "비밀번호가 일치하지 않습니다.", Toast.LENGTH_SHORT).show()
            }
            else {
                auth.createUserWithEmailAndPassword(email, password).addOnCompleteListener(this) { task ->
                    if (task.isSuccessful) {
                        thread(start = true) {
                            try {
                                val url = URL("http://10.0.2.2:5000/user/create")
                                val conn = url.openConnection() as HttpURLConnection
                                conn.requestMethod = "POST"
                                val postData = "id=${auth.uid}&email=$email&nick_name=$nickName&birth=$birth"

                                conn.doOutput = true
                                conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded")
                                conn.setRequestProperty("Content-Length", postData.length.toString())
                                conn.useCaches = false

                                DataOutputStream(conn.outputStream).use { it.writeBytes(postData) }
                                BufferedReader(InputStreamReader(conn.inputStream)).use { br ->
                                    var line: String?
                                    while (br.readLine().also { line = it } != null) {
                                        println(line)
                                    }
                                }
                            } catch (e: Exception) {
                                //예외 발생시 처리할 내용
                                Toast.makeText(baseContext, "잠시 후에 다시 시도해주세요.", Toast.LENGTH_SHORT).show();
                            }
                        }
                        startActivity(Intent(this, AddCalendar::class.java))
                    } else {
                        if (task.exception.toString() == "com.google.firebase.auth.FirebaseAuthInvalidCredentialsException: The email address is badly formatted.") {
                            Toast.makeText(baseContext, "이메일 형식으로 입력해주세요.", Toast.LENGTH_SHORT).show()
                        } else {
                            Toast.makeText(baseContext, "이미 존재하는 이메일입니다.", Toast.LENGTH_SHORT).show()
                        }
                        println(task.exception)
                    }
                }
            }

        }
    }

    override fun onTouchEvent(event: MotionEvent): Boolean {
        val imm: InputMethodManager = getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
        imm.hideSoftInputFromWindow(currentFocus?.windowToken, 0)
        return true
    }
}