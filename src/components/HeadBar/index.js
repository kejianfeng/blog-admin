import React, {Component} from 'react'
import styles from './index.module.scss'
import {Dropdown} from 'antd'
class HeadBar extends Component {
	render () {
		const menu = (
			<span className={styles.logOut}>退出</span>
		)
		return (
				<div className={styles.head_bar}>
					<div className={styles.logo}>
						<img src={require('../../assets/images/Jamki-logo.png')} alt="."></img>
					</div>
					<div className={styles.user_info}>
              <Dropdown  overlay={menu} className="fs-nm" trigger={['click']}>
								<span>Jamki</span>
							</Dropdown >
					</div>
				</div>
			)
		
	}
}
export default HeadBar