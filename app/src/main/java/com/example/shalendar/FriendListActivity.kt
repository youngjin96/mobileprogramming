package com.example.shalendar

import android.content.DialogInterface
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.example.shalendar.databinding.DialogEdittextBinding
import com.example.shalendar.databinding.FriendListLayoutBinding


class FriendListActivity: AppCompatActivity() {

    //private val data = ArrayList<String>() //진짜
    val data = ArrayList<String>() //테스트 용

    private lateinit var binding: FriendListLayoutBinding

    override fun onCreate(savedInstanceState: Bundle?) {

        data.add("Hue") //테스트 용

        super.onCreate(savedInstanceState)
        binding = FriendListLayoutBinding.inflate(layoutInflater)
        setContentView(binding.root)

        //리사이클러 뷰 바인딩
        binding.rvFriendList.adapter = FriendListRVAdaptor(data, onClickDeleteIcon = {delete(it)})


        //검색 버튼 누른 후 다이얼로그 실행
        binding.searchBtn.setOnClickListener() {
            val builder = AlertDialog.Builder(this)
            val EditTextItem = DialogEdittextBinding.inflate(layoutInflater)
            val editText = EditTextItem.editText
            builder.setTitle("친구 찾기")
            builder.setMessage("닉네임을 입력해주십시오")
            builder.setView(EditTextItem.root)
            builder.setPositiveButton("검색") {
                dialogInterface: DialogInterface, i: Int -> 
                if(editText.text != null) Toast.makeText(applicationContext, "찾기!", Toast.LENGTH_SHORT).show()
            }
            builder.show()
        }


    }
    //리사이클러 뷰 삭제
    fun delete(string: String) {
        data.remove(string)
        binding.rvFriendList.adapter?.notifyDataSetChanged()
    }
}