package com.example.shalendar


import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import android.widget.EditText
import android.widget.Toast
import com.example.shalendar.databinding.ActivityCalendarMainBinding


class CalendarMain : AppCompatActivity() {
    private var mBinding : ActivityCalendarMainBinding? = null
    private val binding get() = mBinding!!

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mBinding = ActivityCalendarMainBinding.inflate(layoutInflater)
        setContentView(binding.root)



        }
    }




//
//        val calendar_list_add = findViewById<View>(R.id.btnAdd) as Button
//        calendar_list_add.setOnClickListener {
//            startActivity(Intent(this, AddCalendar::class.java))
//        }







