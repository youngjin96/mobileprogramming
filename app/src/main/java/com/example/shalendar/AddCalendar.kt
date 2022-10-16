package com.example.shalendar

import android.os.Bundle
import android.system.Os.access
import android.view.Gravity
import android.view.MenuItem
import android.widget.Toast
import android.widget.Toolbar
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.GravityCompat
import androidx.drawerlayout.widget.DrawerLayout
import com.google.android.material.navigation.NavigationView
import kotlinx.android.synthetic.main.activity_add_calendar.*


class AddCalendar :AppCompatActivity(), NavigationView.OnNavigationItemSelectedListener {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_add_calendar)

        navbar_open.setOnClickListener {
            drawerLayout.openDrawer(GravityCompat.START) // Start 왼쪽 방향에서 시작한다.
        }

        nav_view.setNavigationItemSelectedListener(this)

    }

    override fun onNavigationItemSelected(item: MenuItem): Boolean { //네비게이션 아이템 클릭시 수행

        when (item.itemId) {
            R.id.nav_info_change -> Toast.makeText(applicationContext, "개인정보변경", Toast.LENGTH_SHORT).show()
            R.id.nav_enquiry -> Toast.makeText(applicationContext, "문의사항", Toast.LENGTH_SHORT).show()
            R.id.nav_event-> Toast.makeText(applicationContext, "이벤트", Toast.LENGTH_SHORT).show()
            R.id.nav_configuration -> Toast.makeText(applicationContext, "환경설정", Toast.LENGTH_SHORT).show()
            R.id.nav_logout -> Toast.makeText(applicationContext, "로그아웃", Toast.LENGTH_SHORT).show()
        }



        drawerLayout.closeDrawers() //네비게이션 뷰 닫기
        return false

    }

    override fun onBackPressed() {
        if(drawerLayout.isDrawerOpen(GravityCompat.START))
            {

                drawerLayout.closeDrawers()
             }
        else{
            super.onBackPressed()
        }

    }
}


