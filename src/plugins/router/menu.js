export default [
	{
		label: 'menu.parameter.operations',
		icon: 'account_circle',
		color: 'info',
		container: true,
		children: [
			{
				label: 'menu.parameter.siparis',
				icon: 'chat',
				container: true,
				active: false,
				children: [
					{
						label: 'menu.parameter.operation',
						icon: 'device_hub',
						container: false,
						path: 'operation',
						tags: 'operation, operasyon'
					},
					{
						label: 'menu.parameter.siparis',
						icon: 'build',
						container: false,
						path: 'siparis',
						tags: 'siparis, order'
					},
					{
						label: 'menu.parameter.worker',
						icon: 'settings',
						container: false,
						path: 'worker',
						tags: 'worker, çalışan, sipariş'
					},
					{
						label: 'menu.parameter.card',
						icon: 'device_hub',
						container: false,
						path: 'card',
						tags: 'card, kart'
					}
				]
			},
			{
				label: 'menu.parameter.student',
				icon: 'mdi-home',
				container: true,
				active: false,
				children: [
					{
						label: 'menu.student.classroom',
						icon: 'class',
						container: false,
						path: 'classroom',
						tags: ''
					},
					{
						label: 'menu.student.lesson',
						icon: 'subtitles',
						container: false,
						path: 'lesson',
						tags: ''
					},
					{
						label: 'menu.student.teacher',
						icon: 'contactless',
						container: false,
						path: 'teacher',
						tags: ''
					},
					{
						label: 'menu.student.student',
						icon: 'person_pin',
						container: false,
						path: 'student',
						tags: ''
					}
				]
			}
		]
	},
	{
		label: 'menu.user.operations',
		icon: 'voice_chat',
		color: 'warning',
		container: true,
		children: [
			{
				label: 'menu.parameter.siparis',
				icon: 'chat',
				container: true,
				active: false,
				children: [
					{
						label: 'menu.parameter.makina',
						icon: 'settings',
						container: false,
						path: 'hello',
						tags: ''
					},
					{
						label: 'menu.parameter.makina-grup',
						icon: 'device_hub',
						container: false,
						path: 'hello2',
						tags: ''
					}
				]
			},
			{
				label: 'menu.user.create',
				icon: 'add',
				container: false,
				active: false,
				path: 'hello2',
				tags: ''
			}
		]
	},
	{
		label: 'menu.profile',
		icon: 'settings',
		color: 'accent',
		container: false,
		path: 'profile',
		tags: 'ad, soyad, doğum, tarih, email'
	}
]
