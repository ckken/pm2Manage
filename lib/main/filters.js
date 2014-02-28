angular.module('CrownApp.filters', [])

    .filter('size', [function () {
        return function (num) {
            if (num > 1000000000){
                num = Math.round(num / 1000000000);
                return num + ' GB';
            }
            else if (num > 1000000){
                num = Math.round(num / 1000000);
                return num  + ' MB';
            }
            else if (num > 1000){
                num = Math.round(num / 1000);
                return num  + ' KB';
            }

        }
    }])

    .filter('percent', [function () {
        return function (size,total) {
           return Math.round((1-size/total)*100);
        }
    }])

    .filter('itempercent', [function () {
        return function (size,total) {
            return Math.round((size/total)*100);
        }
    }])

    .filter('online', [function () {
        return function (status) {
            return (status == 'online') ? 'label label-success' : 'label label-danger';
        }
    }])
    .filter('progressStyle', [function () {
        return function (status, total) {
            if (status > 0 && total > 0) {
                status = status / total * 100;
                if (status > 75)return 'progress-bar-danger';
                else if (status <= 75 && status > 50)return 'progress-bar-warning';
                else if (status <= 50 && status > 25)return 'progress-bar-info';
                else return 'progress-bar-success';
            }
        }
    }])
    .filter('dgmdate', ['dateFilter',function (dateFilter) {
        return function (time,init) {

            var getTime = function(time){
                var now = new Date();
                var nowtime = now.getTime();
                time = parseInt(time);
                nowtime = parseInt((nowtime-time)/1000);
                return nowtime;
            }


            time = (init)?getTime(time):time;
            var format = '';
            var day = parseInt((time) / 86400);
            var week = parseInt((day) / 7);

            if (time&&day<1) {
                if (time > 3600) {
                    strtime = parseInt(time / 3600);
                    format = strtime + ' 小时前';
                }
                else if (time > 1800) {
                    format = '半小时前';
                } else if (time > 60) {
                    strtime = parseInt(time / 60);
                    format = strtime + ' 分钟前';
                } else if (time > 0) {
                    format = strtime + ' 秒前';
                } else if (time == 0) {
                    format = '刚刚';
                }
            }

            else if (day >= 0) {
                if (day == 0) {
                    format = '昨天';
                } else if (day == 1) {
                    format = '前天';
                } else {
                    format = day + '天前';
                    //format+= '-'+dateFilter(time, 'HH:mm:ss');
                }
            }

            return format;
        }

    }])
    .value('version', '0.1');