package com.example.shalendar


import android.os.Bundle
import android.view.MenuItem
import android.widget.Toast
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.appcompat.app.AppCompatActivity
import androidx.drawerlayout.widget.DrawerLayout
import com.google.android.material.navigation.NavigationView




class AddCalendar :AppCompatActivity() {

    lateinit var toggle : ActionBarDrawerToggle

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_add_calendar)


//        val drawerLayout : DrawerLayout = findViewById(R.id.drawerLayout)
//        val navView: NavigationView = findViewById(R.id.nav_view)
//
//        toggle = ActionBarDrawerToggle( this,drawerLayout, R.string.open,R.string.close )
//        drawerLayout.addDrawerListener(toggle)
//        toggle.syncState()
//
//        supprotActionBar?.setDisplayHomeAsUpEnabled(true)
//
//        navView.setNavigationItemSelectedListener(
//            when(it.itemId){
//                R.id.nav_info_change -> Toast.makeText(applicationContext, "Clicked info",toast.LENGTH_SHORT ).SHOW()
//            }
//
//        )


    }

//    override fun onOptionsItemSelected(item) : Boolean {
//        if(toggle.onOptionsItemSelected(item)){
//            return true
//        }
//    }


}