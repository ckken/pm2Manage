/**
 * Created by Ken.xu on 14-2-28.
 */

angular.module('tools', []).
    factory('tools', function () {
        var breaker = {};

        return {
            union: union,
            checkType: checkType
        };


        function union(a, b) {
            var type = checkType(a);

            if (b === undefined) {
                b = a;
                a = type === 'object' ? {} : [];
            }
            if (type === checkType(b)) {
                if (type === 'object' || type === 'array') {
                    angular.forEach(b, function (x, i) {
                        var type = checkType(x);
                        if (type === 'object' || type === 'array') {
                            a[i] = type === checkType(a[i]) ? a[i] : (type === 'object' ? {} : []);
                            union(a[i], x);
                        } else {
                            a[i] = type === 'function' ? null : x;
                        }
                    });
                } else {
                    a = type === 'function' ? null : b;
                }
            }
            return a;
        }

        function checkType(obj) {
            var type = typeof obj;
            if (obj === null) {
                return 'null';
            } else if (angular.isArray(obj)) {
                return 'array';
            } else {
                return type;
            }
        }

    });