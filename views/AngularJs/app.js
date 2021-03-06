var course = angular.module('course', ['ngRoute','ngCookies']);

course.factory('getCategories', ($http)=> {
     return $http.get('http://localhost:5000/category/')
})

course.config( function ($routeProvider,$locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
    }) 
   
    $routeProvider
   //courses routes 
    .when('/', { templateUrl: './courses/courses.html' , controller:'courseController'})
    .when('/course', { templateUrl: './courses/courses.html' , controller:'courseController'})
    .when('/create', { templateUrl: './courses/createCourse.html' , controller:'courseController'})
    .when('/update/:id', { templateUrl: './courses/updateCourse.html', controller:'courseController'})

    //catgeories routes
    .when('/category/', { templateUrl: './categories/categories.html' , controller:'categoryController'})
    .when('/category/create', { templateUrl: './categories/createCategory.html' , controller:'categoryController'})
    .when('/category/:id', { templateUrl: './categories/categoryCourses.html', controller:'categoryController'})
    .when('/category/update/:id', { templateUrl: './categories/updateCategory.html', controller:'categoryController'})

    //users routes
    .when('/user/list', { templateUrl: './user/users.html' , controller:'userController'})
    .when('/user/login', { templateUrl: './user/login.html' , controller:'userController'})
    .when('/user/register', { templateUrl: './user/register.html' , controller:'userController'})
    .otherwise({ redirectTo: '/' });

}
)

course.controller('courseController', function($scope,$http,$location,$route,getCategories ) {
    getCategories.then(function(res){ $scope.categories = res.data; });
    $scope.loggedUser='aa';

    $http.get('http://localhost:5000/course/').then(function(res) {
        $scope.All = res.data;
        $scope.courses = res.data; 
        getCategories.then(function(res) {$scope.categories = res.data;});});
    
    $scope.getCourseById = function (id){
        $http.get('http://localhost:5000/course/'+id).then(function(res) {
        $scope.course = res.data; 
    });}

   
    $scope.filterCondition=function(query){
        $scope.filteredCourses=[]
        $scope.courses = $scope.All;
        if(query=="-"){
            $scope.courses=$scope.All;
        }else {
            angular.forEach($scope.courses, (course)=>{
                course.categories.forEach(
                    (category)=>{ if(category.name==query) $scope.filteredCourses.push(course); })});
                $scope.result =[...$scope.filteredCourses.reduce((map,obj)=> map.set(obj.id,obj), new Map()).values()];
                $scope.courses = $scope.result;
        }}




    $scope.createCourse = function (name,description,maxPoints){
        $http.post('http://localhost:5000/course/create',{name:name,description:description,maxPoints:maxPoints}).then(function(res) {
        $scope.course = res.data; 
        $location.path('/');
    }); 

}
    $scope.update=function(course){
        $scope.course=course
        $location.path('/update/'+course.id)
        
    }
    $scope.updateCourse = function (id,name,description,maxPoints){
        $http.put('http://localhost:5000/course/update/'+id,{name:name,description:description,maxPoints:maxPoints}).then(function(res) {
            $scope.course = res.data; 
            $location.path('/');
          
        });
        } 
    $scope.deleteCourse = function (id){
        $http.delete('http://localhost:5000/course/delete/'+id).then(function(res) {
        });}


        
    $scope.init=function(){
        if($route.current.params.id){
            $scope.getCourseById($route.current.params.id)
        }
    }
    $scope.init();
})

course.controller('categoryController', function($scope,$http,$location,$route,getCategories)   {
   
   getCategories.then(function(res){ $scope.res = res.data; });

   
   var getCategoryById = function (id){
        $http.get('http://localhost:5000/category/'+id).then(function(res) {
        $scope.category = res.data; 
        $scope.courses = res.data.courses;
        
    });}

    $scope.browseCategory = function (id){
        $location.path('/category/'+id);
    }
    
    $scope.createCategory = function (name){
        $http.post('http://localhost:5000/category/create',{name:name}).then(function(res) {
        $scope.category = res.data; 
        $location.path('/category/');
        
    });}
    
    $scope.update = function(category){
        $scope.category=category
        $location.path('/category/update/'+category.id)
        
    }
    $scope.updateCategory = function (id,name){
        $http.put('http://localhost:5000/category/update/'+id,{name:name}).then(function(res) {
            $scope.category =res.data; 
            $location.path('/category/');
        });
        }
    $scope.deleteCategory = function (id){
        $http.delete('http://localhost:5000/category/delete/'+id).then(function(res) {
            $scope.category = res.data; 
         
        });
        }
        
    $scope.init=function(){
        if($route.current.params.id){
            getCategoryById($route.current.params.id)
        }
    }
    $scope.init();
})

course.controller('userController', function($scope,$http,$location) {
    $http.get('http://localhost:5000/user/users').then(function(res) {
        $scope.users = res.data; 
    })
    $scope.registerUser=(username , password)=>{
        $http.post('http://localhost:5000/user/register',{username:username,password:password}).then(function(res) {
            $location.path('/');
        });
    }
   
    $scope.loginUser=(username,password)=>{
        $http.post('http://localhost:5000/user/login',{username:username,password:password}).then(function(res) {
            localStorage.setItem('token',res.data.token);
            $location.path('/');  
        });
    }


    $scope.disableUser=(id , status)=>{
        $http.post('http://localhost:5000/user/disable',{id:id,status:status})
    }
        
    $scope.deleteUser=(id)=>{
        $http.post('http://localhost:5000/user/delete/',{id:id})
    }
   
})