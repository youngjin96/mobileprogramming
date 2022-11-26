package com.example.shalendar

import android.R
import android.content.Intent
import android.os.Bundle
import android.provider.ContactsContract.CommonDataKinds.Nickname
import android.view.View
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.example.shalendar.databinding.ActivityInfoChangeBinding


class InfoChange: AppCompatActivity() {
    //private var mBinding : ActivityInfoChangeBinding? = null
   // private val binding get() = mBinding!!
    private lateinit var binding: ActivityInfoChangeBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityInfoChangeBinding.inflate(layoutInflater)
        setContentView(binding.root)


        binding.PersonalInfoChangeBtn.setOnClickListener(){
            var ID = binding.IDText.text.toString()
            var Address = binding.AddressText.text.toString()
            var Nickname = binding.NicknameText.text.toString()
            var TelNum = binding.TelNumText.text.toString()

            if (ID.isEmpty()) {
                Toast.makeText(applicationContext, "변경할 아이디를 입력해주십시오", Toast.LENGTH_SHORT).show()
            }
            else if (Address.isEmpty()) {
                Toast.makeText(applicationContext, "변경할 주소를 입력해주십시오", Toast.LENGTH_SHORT).show()
            }
            else if (Nickname.isEmpty()) {
                Toast.makeText(applicationContext, "변경할 닉네임를 입력해주십시오", Toast.LENGTH_SHORT).show()
            }
            else if (TelNum.isEmpty()) {
                Toast.makeText(applicationContext, "변경할 전화번호를 입력해주십시오", Toast.LENGTH_SHORT).show()
            }
            else show()
        }
    }
    fun show() {
        val builder = AlertDialog.Builder(this)
        builder.setTitle("변경사항 저장")
        builder.setMessage("변경사항을 저장하시겠습니까?")
        builder.setPositiveButton(
            "예"
        ) { dialog, which ->
            Toast.makeText(applicationContext, "내용을 변경합니다", Toast.LENGTH_LONG).show()
            startActivity(Intent(this, AddCalendar::class.java))
        }
        builder.setNegativeButton(
            "아니오"
        ) { dialog, which ->
            Toast.makeText(applicationContext, "변경하지 않습니다", Toast.LENGTH_LONG).show()
            startActivity(Intent(this, AddCalendar::class.java))
        }
        builder.show()
    }
}