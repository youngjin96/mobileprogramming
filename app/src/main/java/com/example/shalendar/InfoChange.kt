package com.example.shalendar

import android.R
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity


class InfoChange: AppCompatActivity() {
    @Override
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_info_change)

        val button: Button = findViewById<View>(R.id.Personal_info_change_button) as Button
        button.setOnClickListener {
            fun onClick(view: View?) {
                show()
            }
        }

    }
    fun show() {
        val builder = AlertDialog.Builder(this)
        builder.setTitle("변경사항 저장")
        builder.setMessage("변경사항을 저장하시겠습니까?")
        builder.setPositiveButton(
            "예"
        ) { dialog, which ->
            Toast.makeText(applicationContext, "예를 선택했습니다.", Toast.LENGTH_LONG).show()
        }
        builder.setNegativeButton(
            "아니오"
        ) { dialog, which ->
            Toast.makeText(applicationContext, "아니오를 선택했습니다.", Toast.LENGTH_LONG).show()
        }
        builder.show()
    }
}