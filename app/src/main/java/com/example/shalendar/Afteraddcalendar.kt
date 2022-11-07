package com.example.shalendar
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.shalendar.databinding.ActivityAddCalendarBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase


class Afteraddcalendar : AppCompatActivity() {
    private var mBinding : ActivityAddCalendarBinding? = null
    private val binding get() = mBinding!!
//    private lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mBinding = ActivityAddCalendarBinding.inflate(layoutInflater)
        setContentView(binding.root)
//
//        auth = Firebase.auth

    }
}