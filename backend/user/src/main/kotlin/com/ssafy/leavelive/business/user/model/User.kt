package com.ssafy.leavelive.business.user.model

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

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
    var isProvider: UserType = UserType.USER,

    @Column(name = "IS_TRAVELING")
    var isTraveling: Status = Status.NONE
)
