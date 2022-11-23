package com.example.shalendar


import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import com.example.shalendar.databinding.ActivityCalendarMainBinding
import com.prolificinteractive.materialcalendarview.CalendarDay
import java.util.*


class CalendarMain : AppCompatActivity() {
    private var mBinding : ActivityCalendarMainBinding? = null
    private val binding get() = mBinding!!
    val calList = ArrayList<CalendarDay>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mBinding = ActivityCalendarMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        calList.add(CalendarDay.from(2022,11,3))

        for (i in calList){
            binding.cvCalendar.setDateSelected(i, true)
        }
        binding.cvCalendar.setOnDateChangedListener { widget, date, selected ->
            // post

        }
    }
}




//
//        val calendar_list_add = findViewById<View>(R.id.btnAdd) as Button
//        calendar_list_add.setOnClickListener {
//            startActivity(Intent(this, AddCalendar::class.java))
//        }







