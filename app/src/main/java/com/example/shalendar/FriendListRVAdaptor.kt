package com.example.shalendar

import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.shalendar.databinding.FriendListItemBinding

data class Friends(
    val text: String
)

class FriendListRVAdaptor(
    private val dataSet: List<Friends>,
    val onClickDeleteIcon: (friends: Friends) -> Unit): //삭제 버튼 눌렀을 때 onCLickDeleteIcon 실행하라는 뜻, 함수 자체 리턴 없다
    RecyclerView.Adapter<FriendListRVAdaptor.ViewHolder>() {

    class ViewHolder(val binding: FriendListItemBinding) :
        RecyclerView.ViewHolder(binding.root) {
        val friendsText: TextView
            get() {
                TODO()
            }
    }

    override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(viewGroup.context).inflate(R.layout.friend_list_item, viewGroup, false)
            //FriendListItemBinding.inflate(LayoutInflater.from(viewGroup.context), viewGroup, false)
        return ViewHolder(FriendListItemBinding.bind(view))
    }
//    interface onItemClickListner{
//        fun onDeleteClick(parent: ViewGroup, position: Int)
//    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val listposition = dataSet[position]
        holder.binding.tvNickName.text = listposition.text
        holder.binding.deleteBtn.setOnClickListener { //삭제 버튼 눌렸을때 listposition(dataSet)를 전달하면서 onClickDeleteIcon함수를 실행한다.
            onClickDeleteIcon.invoke(listposition)
        }
    }

    override fun getItemCount() = dataSet.size

//                fun bind(data: String) {
//                    binding.tvNickName.text = data
//                }
}