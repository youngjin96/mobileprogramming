package com.example.shalendar

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.MenuItem
import android.view.MotionEvent
import android.view.View
import android.view.inputmethod.InputMethodManager
import android.widget.*
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.SearchView
import androidx.core.view.GravityCompat
import com.example.shalendar.databinding.ActivityAddCalendarBinding
import com.example.shalendar.databinding.ActivityDialogBinding
import com.google.android.material.navigation.NavigationView
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import org.json.JSONArray
import org.json.JSONObject
import org.json.JSONTokener
import java.io.BufferedReader
import java.io.DataOutputStream
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL
import kotlin.concurrent.thread


class AddCalendar :AppCompatActivity(), NavigationView.OnNavigationItemSelectedListener {
    private var mBinding : ActivityAddCalendarBinding? = null
    private val binding get() = mBinding!!
    private lateinit var auth: FirebaseAuth

    var add: Button? = null
    var dialog: AlertDialog? = null
    var layout: LinearLayout? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mBinding = ActivityAddCalendarBinding.inflate(layoutInflater)
        setContentView(binding.root)
        auth = Firebase.auth

        setCards()

        add = findViewById(R.id.add)
        layout = findViewById(R.id.container)

        buildDialog()

//        + 버튼 클릭 시 다이얼로그 레이아웃 생성
        add!!.setOnClickListener { dialog!!.show() }

        binding.navbarOpen.setOnClickListener {
            binding.drawerLayout.openDrawer(GravityCompat.START) // Start 왼쪽 방향에서 시작한다.
        }

        binding.navView.setNavigationItemSelectedListener(this)

        binding.searchView.setOnQueryTextListener(object : SearchView.OnQueryTextListener {
            // 검색 눌렀을 때
            override fun onQueryTextSubmit(query: String?): Boolean {
                return true
            }

            // 검색창에서 글자 입력할때마다 호출
            override fun onQueryTextChange(newText: String?): Boolean {
                return true
            }
        })

    }

    override fun onNavigationItemSelected(item: MenuItem): Boolean { //네비게이션 아이템 클릭시 수행
        when (item.itemId) {
            R.id.nav_info_change ->  startActivity(Intent(this, InfoChange::class.java))
            R.id.nav_enquiry -> startActivity(Intent(this, Enquiry::class.java))
            R.id.nav_event-> startActivity(Intent(this, Event::class.java))
            R.id.nav_setting -> startActivity(Intent(this, Setting::class.java))
            R.id.nav_logout -> {
                Firebase.auth.signOut()
                startActivity(Intent(this, MainActivity::class.java))
            }
        }
        binding.drawerLayout.closeDrawers() //네비게이션 뷰 닫기
        return false
    }

    override fun onBackPressed() {
        if (binding.drawerLayout.isDrawerOpen(GravityCompat.START)) {
            binding.drawerLayout.closeDrawers()
        } else {
            super.onBackPressed()
        }
    }

    override fun onTouchEvent(event: MotionEvent): Boolean {
        val imm: InputMethodManager = getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
        imm.hideSoftInputFromWindow(currentFocus?.windowToken, 0)
        return true
    }

    private fun buildDialog() {
        val builder = AlertDialog.Builder(this)
        val view: View = layoutInflater.inflate(R.layout.activity_dialog, null)
        val name = view.findViewById<EditText>(R.id.et_name)
        builder.setView(view)
        builder.setTitle("달력 이름").setPositiveButton("OK") { dialog, which ->
            if (name.text.toString() == "") {
                Toast.makeText(this, "달력 이름을 설정해주세요.", Toast.LENGTH_SHORT).show()
            } else {
                var n = name.text.toString()
                thread(start = true) {
                    val handler = Handler(Looper.getMainLooper())
                    try {
                        val url = URL("http://10.0.2.2:5000/calendar/create")
                        val conn = url.openConnection() as HttpURLConnection
                        conn.requestMethod = "POST"
                        val postData = "user_id=${auth.uid}&name=$n&person_num=1"
                        conn.setRequestProperty(
                            "Content-Type",
                            "application/x-www-form-urlencoded"
                        )
                        conn.setRequestProperty("Content-Length", postData.length.toString())
                        conn.doInput = true
                        conn.doOutput = true

                        DataOutputStream(conn.outputStream).use { it.writeBytes(postData) }
                        val response = conn.inputStream.bufferedReader().use { it.readText() }
                        val jsonArray = JSONTokener(response).nextValue() as JSONArray

                        for (i in 0 until jsonArray.length()) {
                            var name = jsonArray.getJSONObject(i).getString("name")
                            var id = jsonArray.getJSONObject(i).getString("id")
                            var num = jsonArray.getJSONObject(i).getString("person_num")
                            handler.postDelayed({ addCard(name, id) }, 0)
                        }
                    } catch (e: Exception) {
                        handler.postDelayed({
                            Toast.makeText(baseContext, "잠시 후에 시도해주세요.", Toast.LENGTH_SHORT).show(); }, 0)
                        }
                    }
                    name.getText().clear()
                }
            }
            .setNegativeButton("Cancel") {
                    dialog, which -> name.getText().clear()
            }
        dialog = builder.create()
    }

    private fun addCard(name: String, id: String) {
        val view = layoutInflater.inflate(R.layout.card, null)
        val nameView = view.findViewById<TextView>(R.id.tv_name)
        val delete = view.findViewById<Button>(R.id.delete)
        nameView.text = name
        nameView.setId(id.toInt())
        nameView.setOnClickListener {
            startActivity(Intent(this, CalendarMain::class.java).putExtra("calendar_id", nameView.getId().toString()))
        }
        delete.setOnClickListener {
            layout!!.removeView(view)
            thread(start = true) {
                try {
                    val url = URL("http://10.0.2.2:5000/calendar/delete/$name")
                    val conn = url.openConnection() as HttpURLConnection
                    conn.requestMethod = "DELETE"
                    conn.doInput = true
                    conn.doOutput = false

                    val responseCode = conn.responseCode
                    if (responseCode == HttpURLConnection.HTTP_OK) {
                        println("삭제")
                    } else {
                        println("실패")
                    }

                } catch (e: Exception) {
                    Toast.makeText(baseContext, "잠시 후에 다시 시도해주세요.", Toast.LENGTH_SHORT).show();
                }
            }
        }
        layout!!.addView(view)
    }

    private fun setCards() {
        thread(start = true) {
            val handler = Handler(Looper.getMainLooper())
            val url = URL("http://10.0.2.2:5000/calendar/${auth.uid}")
            val conn = url.openConnection() as HttpURLConnection
            conn.setRequestProperty("Accept", "application/json")
            conn.requestMethod = "GET"

            if (conn.responseCode == HttpURLConnection.HTTP_OK) {
                val response = conn.inputStream.bufferedReader().use { it.readText() }
                val jsonArray = JSONTokener(response).nextValue() as JSONArray

                for (i in 0 until jsonArray.length()) {
                    var id = jsonArray.getJSONObject(i).getString("id")
                    var name = jsonArray.getJSONObject(i).getString("name")
                    var num = jsonArray.getJSONObject(i).getString("person_num")

                    handler.postDelayed({
                        addCard(name, id)
                    }, 0)
                }

            } else {
                handler.postDelayed({
                    Toast.makeText(this, "정보를 읽는데 오류가 발생했습니다.", Toast.LENGTH_SHORT).show()
                }, 0)
            }
        }
    }
}
