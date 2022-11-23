package com.example.shalendar

import android.app.AlertDialog
import android.content.Context
import android.content.DialogInterface
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.InputType
import android.view.MotionEvent
import android.view.inputmethod.InputMethodManager
import android.widget.EditText
import android.widget.Toast
import com.example.shalendar.databinding.ActivityMainBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase

class MainActivity : AppCompatActivity() {
    private var mBinding : ActivityMainBinding? = null
    private val binding get() = mBinding!!
    private lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mBinding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        auth = Firebase.auth

        // 비밀번호 찾기 버튼 -> 다이얼로그 출력하고 비밀번호 재설정 메일 보내기
        binding.textViewFindPassword.setOnClickListener {
            val dialog = AlertDialog.Builder(this)
            dialog.setTitle("비밀번호 재설정")
            val input = EditText(this)
            input.setHint("이메일을 입력해주세요.")
            input.inputType = InputType.TYPE_CLASS_TEXT
            dialog.setView(input)

            dialog.setPositiveButton("확인", DialogInterface.OnClickListener { dialog, which ->
                var email = input.text.toString()
                Firebase.auth.sendPasswordResetEmail(email).addOnCompleteListener { task ->
                    if (task.isSuccessful) {
                        Toast.makeText(baseContext, "비밀번호 재설정 이메일을 보냈습니다.", Toast.LENGTH_SHORT).show()
                    }
                }
            })
            dialog.setNegativeButton("취소", DialogInterface.OnClickListener { dialog, which -> dialog.cancel() })
            dialog.show()
        }

        // 회원가입 눌렀을 때 SignUp 페이지로 이동
        binding.textViewSignUp.setOnClickListener {
            startActivity(Intent(this, SignUp::class.java))
        }

        // 로그인 눌렀을 때 Firebase Authentication으로 로그인 진행
        binding.buttonLogin.setOnClickListener {
            var email = binding.editTextEmail.text.toString()
            var password = binding.editTextPassword.text.toString()

            if (email == "" || password == "") {
                Toast.makeText(baseContext, "이메일 또는 비밀번호를 확인해주세요.", Toast.LENGTH_SHORT).show()
            } else {
                auth.signInWithEmailAndPassword(email, password).addOnCompleteListener(this) { task ->
                    if (task.isSuccessful) {
                        startActivity(Intent(this, AddCalendar::class.java))
                    } else {
                        Toast.makeText(baseContext, "이메일 또는 비밀번호를 확인해주세요.", Toast.LENGTH_SHORT).show()
                    }
                }
            }
//            startActivity(Intent(this, CalendarMain::class.java))
        }
    }

    override fun onTouchEvent(event: MotionEvent): Boolean {
        val imm: InputMethodManager = getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
        imm.hideSoftInputFromWindow(currentFocus?.windowToken, 0)
        return true
    }
}