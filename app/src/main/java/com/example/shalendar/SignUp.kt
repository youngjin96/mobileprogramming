package com.example.shalendar

import android.app.DatePickerDialog
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import androidx.core.content.ContextCompat.startActivity
import com.example.shalendar.databinding.ActivitySignUpBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import java.util.*

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
            else if (password != repeatPassword) {
                Toast.makeText(baseContext, "비밀번호가 일치하지 않습니다.", Toast.LENGTH_SHORT).show()
            }
            else {
                auth.createUserWithEmailAndPassword(email, password).addOnCompleteListener(this) { task ->
                    if (task.isSuccessful) {
                        // TODO : 다음 화면으로 이동
                    } else {
                        Toast.makeText(baseContext, "이메일을 다시 입력해주세요.", Toast.LENGTH_SHORT).show()
                    }
                }
            }

        }
    }
}