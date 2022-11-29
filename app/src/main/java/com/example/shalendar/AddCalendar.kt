package com.example.shalendar

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.MenuItem
import android.view.MotionEvent
import android.view.View
import android.view.inputmethod.InputMethodManager
import android.widget.*
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.SearchView
import androidx.core.content.ContextCompat.getSystemService
import androidx.core.content.ContextCompat.startActivity
import androidx.core.view.GravityCompat
import com.example.shalendar.databinding.ActivityAddCalendarBinding
import com.google.android.material.navigation.NavigationView
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL
import kotlin.concurrent.thread


class AddCalendar :AppCompatActivity(), NavigationView.OnNavigationItemSelectedListener {
    private var mBinding : ActivityAddCalendarBinding? = null
    private val binding get() = mBinding!!


    //    private var dialog01: Dialog? = null
    var add: Button? = null
    var dialog: AlertDialog? = null
    var layout: LinearLayout? = null


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mBinding = ActivityAddCalendarBinding.inflate(layoutInflater)
        setContentView(binding.root)
        val view: View = layoutInflater.inflate(R.layout.activity_dialog, null)

        add = findViewById(R.id.add)
        layout = findViewById(R.id.container)

        buildDialog()



//        + 버튼 클릭 시 다이얼로그 레이아웃 생성
        add!!.setOnClickListener { dialog!!.show() }

        binding.navbarOpen.setOnClickListener {
            binding.drawerLayout.openDrawer(GravityCompat.START)
        }



        binding.navView.setNavigationItemSelectedListener(this)

        binding.searchView.setOnQueryTextListener(object : SearchView.OnQueryTextListener {
            // 검색 눌렀을 때
            override fun onQueryTextSubmit(query: String?): Boolean {
                thread(start = true) {
                    val url = URL("http://10.0.2.2:5000/user")
                    val conn = url.openConnection() as HttpURLConnection
                    conn.requestMethod = "GET"

                    if (conn.responseCode == HttpURLConnection.HTTP_OK) {
                        val streamReader = InputStreamReader(conn.inputStream)
                        val buffered = BufferedReader(streamReader)

                        val content = StringBuilder()
                        while (true) {
                            val data = buffered.readLine() ?: break
                            content.append(data)
                        }

                        buffered.close()
                        conn.disconnect()
                        println(content)
                    } else {
                        println("서버 꺼짐")
                    }
                }
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
//            R.id.nav_logout -> {
//                Firebase.auth.signOut()
//                startActivity(Intent(this, MainActivity::class.java))
//            }

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
        builder.setTitle("달력 이름").setPositiveButton("확인")
        { dialog, which ->
            if (name.text.toString() == "") {
                Toast.makeText(this, "달력 이름을 설정해주세요.", Toast.LENGTH_SHORT).show()
            } else {  addCard(name.text.toString())
                name.setText("")} }

            .setNegativeButton("취소")
            { dialog, which -> }

        dialog = builder.create()
    }

    private fun addCard(name: String) {
        val view = layoutInflater.inflate(R.layout.card, null)
        val nameView = view.findViewById<TextView>(R.id.tv_name)
        val delete = view.findViewById<Button>(R.id.delete)
        nameView.text = name
        delete.setOnClickListener { layout!!.removeView(view) }
        layout!!.addView(view)
        view.setOnClickListener {
            startActivity(Intent(this, CalendarMain::class.java))
        }

    }

}