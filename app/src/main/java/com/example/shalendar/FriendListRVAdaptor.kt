package com.example.shalendar

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.shalendar.databinding.FriendListItemBinding

class FriendListRVAdaptor(private val dataSet: ArrayList<String>,
                          val onClickDeleteIcon: (string: String) -> Unit): //삭제 버튼 눌렀을 때 onCLickDeleteIcon 실행하라는 뜻, 함수 자체 리턴 없다
    RecyclerView.Adapter<FriendListRVAdaptor.ViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding = FriendListItemBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ViewHolder(binding)
    }
//    interface onItemClickListner{
//        fun onDeleteClick(parent: ViewGroup, position: Int)
//    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val listposition = dataSet[position]
        holder.binding.deleteBtn.setOnClickListener { //삭제 버튼 눌렸을때 listposition(dataSet)를 전달하면서 onClickDeleteIcon함수를 실행한다.
            onClickDeleteIcon.invoke(listposition)
        }
    }

    override fun getItemCount(): Int {
        return dataSet.size
    }


    class ViewHolder(val binding: FriendListItemBinding) :
            RecyclerView.ViewHolder(binding.root) {
                fun bind(data: String) {
                    binding.tvNickName.text = data
                }
            }
}