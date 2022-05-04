package com.leavelive.diary.model

import java.time.LocalDate
import javax.persistence.*

@Entity
@Table(name = "DIARY")
class Diary(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var diaryId: Long,

    @Column(name = "CONTENT")
    var content: String,

    @Column(name = "STATUS")
    @Enumerated(EnumType.STRING)
    var status: Status,

    @Column(name = "TAG")
    var tag: String?,

    @Column(name = "DATE")
    var date: LocalDate,

    @Column(name = "PIC_PATH")
    var picPath: String?,

    // referencing area
    @Column(name = "USER_ID")
    var userId: String

)