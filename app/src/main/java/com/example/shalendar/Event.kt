package com.example.shalendar

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class Event: AppCompatActivity() {
    @Override
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_event)
    }
}