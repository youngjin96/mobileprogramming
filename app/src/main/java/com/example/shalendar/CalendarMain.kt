package com.example.shalendar


import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import com.example.shalendar.databinding.ActivityCalendarMainBinding
import com.prolificinteractive.materialcalendarview.CalendarDay
import java.io.BufferedReader
import java.io.DataOutputStream
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL
import java.util.*
import kotlin.concurrent.thread


class CalendarMain : AppCompatActivity() {
    private var mBinding : ActivityCalendarMainBinding? = null
    private val binding get() = mBinding!!
    val calList = ArrayList<CalendarDay>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mBinding = ActivityCalendarMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        calList.add(CalendarDay.from(2022,11,3))

        val calIntent = intent
        var id = calIntent.getStringExtra("calendar_id")

        for (i in calList){
            binding.cvCalendar.setDateSelected(i, true)
        }
        binding.cvCalendar.setOnDateChangedListener { widget, date, selected ->
            thread(start = true) {
                try {
                    val url = URL("http://10.0.2.2:5000/schedule/$id")
                    val conn = url.openConnection() as HttpURLConnection
                    conn.requestMethod = "POST"
                    val postData = "calendar_id=$id&year=${date.year}&month=${date.month}&day=${date.day}"

                    conn.doOutput = true
                    conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded")
                    conn.setRequestProperty("Content-Length", postData.length.toString())
                    conn.useCaches = false

                    DataOutputStream(conn.outputStream).use { it.writeBytes(postData) }
                    BufferedReader(InputStreamReader(conn.inputStream)).use { br ->
                        var line: String?
                        while (br.readLine().also { line = it } != null) {
                            println(line)
                        }
                    }

                } catch (e: Exception) {
                    //예외 발생시 처리할 내용
                    Toast.makeText(baseContext, "잠시 후에 다시 시도해주세요.", Toast.LENGTH_SHORT).show();
                }
            }

        }
    }
}




//
//        val calendar_list_add = findViewById<View>(R.id.btnAdd) as Button
//        calendar_list_add.setOnClickListener {
//            startActivity(Intent(this, AddCalendar::class.java))
//        }







