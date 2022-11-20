package com.example.shalendar

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.example.shalendar.databinding.ActivityInfoChangeBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import org.json.JSONArray
import org.json.JSONTokener
import java.net.HttpURLConnection
import java.net.URL
import kotlin.concurrent.thread

class InfoChange: AppCompatActivity() {
    private lateinit var auth: FirebaseAuth
    private var mBinding : ActivityInfoChangeBinding? = null
    private val binding get() = mBinding!!
    private var email = ""
    private var nickName = ""
    private var birth = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mBinding = ActivityInfoChangeBinding.inflate(layoutInflater)
        setContentView(binding.root)
        auth = Firebase.auth

        thread(start = true) {
            val handler = Handler(Looper.getMainLooper())
            val url = URL("http://10.0.2.2:5000/user/information/${auth.uid}")
            val conn = url.openConnection() as HttpURLConnection
            conn.setRequestProperty("Accept", "application/json")
            conn.requestMethod = "GET"

            if (conn.responseCode == HttpURLConnection.HTTP_OK) {
                val response = conn.inputStream.bufferedReader().use { it.readText() }
                val jsonArray = JSONTokener(response).nextValue() as JSONArray

                for (i in 0 until jsonArray.length()) {
                    email = jsonArray.getJSONObject(i).getString("email")
                    nickName = jsonArray.getJSONObject(i).getString("nick_name")
                    birth = jsonArray.getJSONObject(i).getString("birth")
                }

                binding.tvEmail.setText(email)
                binding.tvNickName.setText(nickName)
                binding.tvBirth.setText(birth)
            } else {
                handler.postDelayed({
                    Toast.makeText(this, "정보를 읽는데 오류가 발생했습니다.", Toast.LENGTH_SHORT).show()
                }, 0)
            }
        }

        // 적용 버튼
        binding.PersonalInfoChangeBtn.setOnClickListener(){
            show()
        }
    }

    fun show() {
        val builder = AlertDialog.Builder(this)
        builder.setTitle("변경사항 저장")
        builder.setMessage("변경사항을 저장하시겠습니까?")
        builder.setPositiveButton(
            "예"
        ) { dialog, which ->
            Toast.makeText(applicationContext, "내용을 변경합니다", Toast.LENGTH_LONG).show()
        }
        builder.setNegativeButton(
            "아니오"
        ) { dialog, which ->
            Toast.makeText(applicationContext, "변경하지 않습니다", Toast.LENGTH_LONG).show()
        }
        builder.show()
    }
}