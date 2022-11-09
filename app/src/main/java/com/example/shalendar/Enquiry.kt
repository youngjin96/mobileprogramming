package com.example.shalendar


import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import android.widget.EditText
import android.widget.Toast
import com.example.shalendar.databinding.ActivityCalendarMainBinding
import com.example.shalendar.databinding.ActivityEnquiryBinding


class Enquiry : AppCompatActivity() {
    private var mBinding : ActivityEnquiryBinding? = null
    private val binding get() = mBinding!!

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mBinding = ActivityEnquiryBinding.inflate(layoutInflater)
        setContentView(binding.root)



    }
}