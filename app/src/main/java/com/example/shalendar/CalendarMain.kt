package com.example.shalendar

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
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