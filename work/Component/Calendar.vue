<template>
    <div class="calendar">
        <div class="attendance-wrap">
            <div class="attendance-header">
                <h5 class="tit">{{currentMonth}}월 출석 현황</h5>
                <p class="sub">이 달의 출석 횟수
					<strong>{{check}}</strong>일, 지급된 캐시 <strong>{{cash}}</strong>원
				</p>
            </div>
            <table class="attendance-table">
                <thead>
                  <tr>
                    <th v-for="(weekName, index) in weekNames" v-bind:key="index">
                      {{weekName}}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in currentCalendar" :key="index">
                    <td v-for="(day, index) in row" :key="index">
                       <span :class="{'none' : day == ''}">{{day}}</span>
                    </td>
                  </tr>
                </tbody>
            </table> 
			<button class="btn-chk" type="button" @click="fnAttendanceCheck">출석체크하기</button>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data() {
            return {
                currentTime:new Date(),
                weekNames: ["일", "월", "화","수", "목", "금", "토"],
                currentCalendar:[],
				currentMonth:null,
				today:null,
				endOfDay:null,
				week:null,
				check:0,
                firstDay:0,
				cash:0,
            }
        },
        mounted:function(){
            var that = this;
           
            var currentYear = that.currentTime.getFullYear();
            var currentMonth = that.currentTime.getMonth() + 1; //0 ~ 11 / +1해주기
            var currentDate = that.currentTime.getDate(); //날짜
            var currentDay = that.currentTime.getDay(); //요일, 월=1
            var endDay = new Date(currentYear, currentMonth, 0).getDate(); //월 마지막날짜
            var firstDay = new Date(currentYear, currentMonth - 1, 1).getDay() + 1; //월 첫번째날짜
            var day=1;
			that.today = currentDate;
			that.endOfDay = endDay;
			that.currentMonth = currentMonth;
            that.firstDay = firstDay - 1;
			that.week = that.getWeek(); //몇 주인지

            //tr for문
            for(var a=0; a<that.week; a++){
				var calendarRow = [];
				for(var i=1; i<=that.weekNames.length; i++){
					if(a==0 && i < firstDay){
						calendarRow.push("");
					}
					else if(day<=that.endOfDay){
						calendarRow.push(day);
						day++;
					}
				}
				that.currentCalendar.push(calendarRow);
            }
			console.log(that.currentCalendar);
        },
        methods: {
			getWeek:function(){
				var that = this;
                return parseInt((that.endOfDay + that.firstDay - 1) / 7) + 1;
			},
			fnAttendanceCheck:function(){
				var that = this;
				var monthStart = 0;

				if(that.check >= that.endOfDay){
					that.check = 0;
					that.cash = 0;
					const checkedDay = document.querySelectorAll('td');
					checkedDay.forEach(chk => {
						chk.className = '';
					});
				}else{
					that.check++;
					var today = document.querySelectorAll('.attendance-table tbody span');
					//출석체크 시작점 구분
					for(var i=0; i<that.endOfDay; i++){
						if(today[i].classList.contains('none')){
							monthStart++
						}
					}
					var realIdx =  that.check + monthStart - 1;
					var realLastDay =  that.endOfDay + monthStart - 1;
					today[realIdx].parentElement.classList.add('checked');
					//누적 7일case
					if(that.check === 7){
						today[realIdx].parentElement.className = 'cash';
						this.cash += 1000;
					}
					//누적 15일case
					if(that.check === 15){
						today[realIdx].parentElement.className = 'cash';
						this.cash += 1000;
					}
					//누적 한달case
					if(that.check === that.endOfDay){
						today[realLastDay].parentElement.className = 'cash';
						this.cash += 1000;
					}
				}
			}
			
        }
    }
</script>

<style scpoed>
.attendance-wrap{padding:40px 16px; }
.attendance-wrap .agree-txt{ padding-top:24px; text-align: center;}
.attendance-wrap .agree-txt .underline{ display: block; padding-top:4px; color: #888;}
.attendance-wrap .guide-txt-block{ margin-top: 60px; padding-bottom:40px; }
.attendance-header{padding:0 16px; text-align: center; }
.attendance-header .tit{ padding-bottom: 6px; font-size: 21px; line-height: 30px; color: #000;}
.attendance-header .sub{font-size: 14px; line-height: 22px; color: #333;}
.attendance-header .sub strong{ letter-spacing: 0; color: #000;}
.attendance-table{ margin:28px auto 0; width: calc(100% - 16px); }
.attendance-table thead{ border-bottom: 1px solid #eee; }
.attendance-table thead th{ padding-bottom: 6px; font-size: 14px; color: #666; font-weight: 400; }
.attendance-table tbody::before,
.attendance-table tbody::after{ content: ""; display: block; width: 100%; height: 15px; background: #fff; } 
.attendance-table tbody::after{height: 32px;}
.attendance-table tbody td{ text-align: center;}
.attendance-table tbody td span{ display: block; margin: 6px auto 0; text-align: center; width: 40px; height: 40px; line-height: 40px; border-radius: 50%; font-size: 14px; letter-spacing: 0; background: #f9f9f9; color: #ddd;}
.attendance-table tbody td span.none{ background: transparent;}
.attendance-table tbody td.checked span{ background: url(../../common/images/icon/ico-heart.png) no-repeat center / 14px #ffeee0; color: transparent; }
.attendance-table tbody td.cash span{ background: url(../../common/images/icon/ico-coin.png) no-repeat center / 24px #ff7051; color: transparent; }
.btn-chk{ width: 100%; height:48px; font-size: 16px; border-radius: 4px; background: #ff943b; color:#fff;}
</style>
