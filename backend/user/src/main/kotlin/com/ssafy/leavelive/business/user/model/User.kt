package com.ssafy.leavelive.business.user.model

import javax.persistence.*

@Entity
@Table(name = "USER")
class User(
    @Id
    var userId: String,

    @Column(name = "NICKNAME")
    var nickname: String,

    @Column(name = "PIC_PATH")
    var picPath: String? = null,

    @Column(name = "IS_PROVIDER")
    @Enumerated(EnumType.STRING)
    var isProvider: UserType = UserType.USER,

    @Column(name = "IS_TRAVELING")
    @Enumerated(EnumType.STRING)
    var isTraveling: Status = Status.NONE
)
