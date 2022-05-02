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

    @Column(name = "TYPE")
    @Enumerated(EnumType.STRING)
    var type: UserType = UserType.USER,

    @Column(name = "STATUS")
    @Enumerated(EnumType.STRING)
    var status: Status = Status.NONE,

    @Column(name = "REFRESH_TOKEN")
    var token: String
)
