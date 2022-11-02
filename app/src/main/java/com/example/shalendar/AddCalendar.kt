package com.example.shalendar

import android.app.Dialog
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.MenuItem
import android.view.MotionEvent
import android.view.View
import android.view.Window
import android.view.inputmethod.InputMethodManager
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.SearchView
import androidx.core.view.GravityCompat
import com.example.shalendar.databinding.ActivityAddCalendarBinding
import com.google.android.material.navigation.NavigationView
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL
import kotlin.concurrent.thread

class AddCalendar :AppCompatActivity(), NavigationView.OnNavigationItemSelectedListener {
    private var mBinding : ActivityAddCalendarBinding? = null
    private val binding get() = mBinding!!

    private var dialog01: Dialog? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mBinding = ActivityAddCalendarBinding.inflate(layoutInflater)
        setContentView(binding.root)

        dialog01 = Dialog(this@AddCalendar) // Dialog 초기화
        dialog01!!.requestWindowFeature(Window.FEATURE_NO_TITLE) // 타이틀 제거
        dialog01!!.setContentView(R.layout.activity_dialog)

//        + 버튼 클릭 시 다이얼로그 레이아웃 생성
        val add_calendar_btn = findViewById<View>(R.id.add_calendar_btn) as Button
        add_calendar_btn.setOnClickListener { showDialog01() }


        binding.navbarOpen.setOnClickListener {
            binding.drawerLayout.openDrawer(GravityCompat.START) // Start 왼쪽 방향에서 시작한다.
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

//    다이얼로그 띄우는 함수

    fun showDialog01() {
        dialog01!!.show() // 다이얼로그 띄우기
        dialog01!!.findViewById<View>(R.id.dialog_append_button).setOnClickListener { // 원하는 기능 구현
//            val intent = Intent(applicationContext, SignUpActivity::class.java)
//            startActivity(intent)
        }
        val noBtn = dialog01!!.findViewById<Button>(R.id.dialog_close_button)
        noBtn.setOnClickListener {
            // 원하는 기능 구현
            dialog01!!.dismiss() // 다이얼로그 닫기
        }
        // 네 버튼


        /* 이 함수 안에 원하는 디자인과 기능을 구현하면 된다. */

        // 위젯 연결 방식은 각자 취향대로~
        // '아래 아니오 버튼'처럼 일반적인 방법대로 연결하면 재사용에 용이하고,
        // '아래 네 버튼'처럼 바로 연결하면 일회성으로 사용하기 편함.
        // *주의할 점: findViewById()를 쓸 때는 -> 앞에 반드시 다이얼로그 이름을 붙여야 한다.
    }

    override fun onNavigationItemSelected(item: MenuItem): Boolean { //네비게이션 아이템 클릭시 수행
        when (item.itemId) {
            R.id.nav_info_change ->  startActivity(Intent(this, InfoChange::class.java))
            R.id.nav_enquiry -> startActivity(Intent(this, Enquiry::class.java))
            R.id.nav_event-> startActivity(Intent(this, Event::class.java))
            R.id.nav_setting -> startActivity(Intent(this, Setting::class.java))
            R.id.nav_logout -> Toast.makeText(applicationContext, "로그아웃", Toast.LENGTH_SHORT).show()
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



}

