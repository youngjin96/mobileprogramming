package com.example.shalendar


import android.os.Bundle

import androidx.appcompat.app.AppCompatActivity
import com.example.shalendar.databinding.ActivityEventBinding

class Event: AppCompatActivity() {
    private var mBinding : ActivityEventBinding? = null
    private val binding get() = mBinding!!

    @Override
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mBinding = ActivityEventBinding.inflate(layoutInflater)
        setContentView(binding.root)
    }
}