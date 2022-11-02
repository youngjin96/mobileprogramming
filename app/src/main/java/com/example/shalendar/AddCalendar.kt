package com.example.shalendar

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.MenuItem
import android.view.MotionEvent
import android.view.inputmethod.InputMethodManager
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.SearchView
import androidx.core.view.GravityCompat
import com.example.shalendar.databinding.ActivityAddCalendarBinding
import com.google.android.material.navigation.NavigationView
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.MalformedURLException
import java.net.URL
import kotlin.concurrent.thread

class AddCalendar :AppCompatActivity(), NavigationView.OnNavigationItemSelectedListener {
    private var mBinding : ActivityAddCalendarBinding? = null
    private val binding get() = mBinding!!

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mBinding = ActivityAddCalendarBinding.inflate(layoutInflater)
        setContentView(binding.root)

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


