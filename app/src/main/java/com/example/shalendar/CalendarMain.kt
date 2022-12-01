package com.example.shalendar


import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.View
import android.widget.*
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.example.shalendar.databinding.ActivityCalendarMainBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import com.prolificinteractive.materialcalendarview.CalendarDay
import org.json.JSONArray
import org.json.JSONObject
import org.json.JSONTokener
import java.io.BufferedReader
import java.io.DataOutputStream
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL
import java.util.*
import kotlin.collections.ArrayList
import kotlin.concurrent.thread


class CalendarMain : AppCompatActivity() {
    private var mBinding : ActivityCalendarMainBinding? = null
    private val binding get() = mBinding!!
    private var setCalendarDates = ArrayList<CalendarDay>()
    private var calList : List<CalendarDay> = listOf()
    private lateinit var auth: FirebaseAuth

    var dialog: AlertDialog? = null
    var layout: LinearLayout? = null


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mBinding = ActivityCalendarMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        val view: View = layoutInflater.inflate(R.layout.activity_dialog, null)

        layout = findViewById(R.id.container)



        val cm_add_friend = findViewById<View>(R.id.button3) as ImageButton
        cm_add_friend.setBackgroundResource(R.drawable.add_friend)
        cm_add_friend.setOnClickListener { dialog!!.show() } //

        buildDialog()

        auth = Firebase.auth
        val calIntent = intent
        var calendarId = calIntent.getStringExtra("calendar_id")


        thread(start = true) {
            val handler = Handler(Looper.getMainLooper())
            try {
                val url = URL("http://10.0.2.2:5000/schedule/date/$calendarId")
                val conn = url.openConnection() as HttpURLConnection
                conn.setRequestProperty("Accept", "application/json")
                conn.requestMethod = "GET"

                if (conn.responseCode == HttpURLConnection.HTTP_OK) {
                    val response = conn.inputStream.bufferedReader().use { it.readText() }
                    val jsonArray = JSONTokener(response).nextValue() as JSONArray

                    for (i in 0 until jsonArray.length()) {
                        var year = jsonArray.getJSONObject(i).getString("year")
                        var month = jsonArray.getJSONObject(i).getString("month")
                        var day = jsonArray.getJSONObject(i).getString("day")

                        setCalendarDates.add(CalendarDay.from(year.toInt(),month.toInt(),day.toInt()))
                    }

                    for (i in setCalendarDates){
                        binding.cvCalendar.setDateSelected(i, true)
                    }
                } else {
                    handler.postDelayed({
                        Toast.makeText(this, "정보를 읽는데 오류가 발생했습니다.", Toast.LENGTH_SHORT).show()
                    }, 0)
                }
            } catch (e: Exception) {
                //예외 발생시 처리할 내용
                Toast.makeText(baseContext, "잠시 후에 다시 시도해주세요.", Toast.LENGTH_SHORT).show();
            }
        }

//        binding.button2.setOnClickListener {
//            calList = binding.cvCalendar.getSelectedDates()
//            var calObj = ArrayList<JSONObject>()
//
//            for (i in calList) {
//                val jsonOb = JSONObject()
//                jsonOb.put("year", i.year)
//                jsonOb.put("month", i.month)
//                jsonOb.put("day", i.day)
//                calObj.add(jsonOb)
//            }
//
//            thread(start = true) {
//                val handler = Handler(Looper.getMainLooper())
//                try {
//                    val url = URL("http://10.0.2.2:5000/schedule/$calendarId")
//                    val conn = url.openConnection() as HttpURLConnection
//                    conn.requestMethod = "POST"
//                    val postData = "calendar_id=$calendarId&data=$calObj"
//
//                    conn.doOutput = true
//                    conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded")
//                    conn.setRequestProperty("Content-Length", postData.length.toString())
//                    conn.useCaches = false
//
//                    DataOutputStream(conn.outputStream).use { it.writeBytes(postData) }
//                    BufferedReader(InputStreamReader(conn.inputStream)).use { br ->
//                        var line: String?
//                        while (br.readLine().also { line = it } != null) {
//                            println(line)
//                        }
//                    }
//                } catch (e: Exception) {
//                    //예외 발생시 처리할 내용
//                    handler.postDelayed({ Toast.makeText(this, "잠시 후에 시도해주세요.", Toast.LENGTH_SHORT).show() }, 0)
//                }
//            }
//        }
//
//        binding.button3.setOnClickListener {
//            thread(start = true) {
//                val handler = Handler(Looper.getMainLooper())
//                try {
//                    val url = URL("http://10.0.2.2:5000/friend/create")
//                    val conn = url.openConnection() as HttpURLConnection
//                    conn.requestMethod = "POST"
//                    val postData = "user_id=${auth.uid}&nick_name=test5"
//
//                    conn.doOutput = true
//                    conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded")
//                    conn.setRequestProperty("Content-Length", postData.length.toString())
//                    conn.useCaches = false
//
//                    DataOutputStream(conn.outputStream).use { it.writeBytes(postData) }
//                    BufferedReader(InputStreamReader(conn.inputStream)).use { br ->
//                        var line: String?
//                        while (br.readLine().also { line = it } != null) {
//                            println(line)
//                        }
//                    }
//                } catch (e: Exception) {
//                    //예외 발생시 처리할 내용
//                    handler.postDelayed({ Toast.makeText(this, "잠시 후에 시도해주세요.", Toast.LENGTH_SHORT).show() }, 0)
//                }
//            }
//        }


        binding.cvCalendar.setOnDateChangedListener { widget, date, selected ->


        }
    }


    private fun buildDialog() {
        val builder = AlertDialog.Builder(this)
        val view: View = layoutInflater.inflate(R.layout.activity_dialog, null)
        val name = view.findViewById<EditText>(R.id.et_name)
        builder.setView(view)
        builder.setTitle("친구 추가").setPositiveButton("확인")
        { dialog, which ->
            if (name.text.toString() == "") {
                Toast.makeText(this, "닉네임을 설정해주세요.", Toast.LENGTH_SHORT).show()
            } else {  addCard(name.text.toString())
                name.setText("")} }

            .setNegativeButton("취소")
            { dialog, which -> }

        dialog = builder.create()
    }

    private fun addCard(name: String) {
        val view = layoutInflater.inflate(R.layout.nickname_add, null)
        val nameView = view.findViewById<TextView>(R.id.nick_name_text)
        val delete = view.findViewById<Button>(R.id.nick_delete)
        nameView.text = name
        delete.setOnClickListener { layout!!.removeView(view) }
        layout!!.addView(view)

    }


}





