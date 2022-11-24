package com.example.shalendar

import android.R
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.example.shalendar.databinding.ActivityInfoChangeBinding


class InfoChange: AppCompatActivity() {
    private var mBinding : ActivityInfoChangeBinding? = null
    private val binding get() = mBinding!!

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mBinding = ActivityInfoChangeBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.PersonalInfoChangeBtn.setOnClickListener(){
            show()
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
        }
        builder.setNegativeButton(
            "아니오"
        ) { dialog, which ->
            Toast.makeText(applicationContext, "변경하지 않습니다", Toast.LENGTH_LONG).show()
        }
        builder.show()
    }
}