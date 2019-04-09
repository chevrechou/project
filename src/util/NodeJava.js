class NodeJava {

    callJavaLogin(username, password) {
        //instantiate java object
        const java = require('java');

        //add required classpaths
        java.classpath.push('commons.io.jar');
        java.classpath.push('java.sql.*');
        java.classpath.push('LoginManager.java');

        //retrieve class
        var logMangerClass = java.import('LoginManager');

        //construct loginManager
        var loginManager = logManagerClass.LoginManagerSync(username,password);

        //call Java authenticate method
        var result = loginManager.authenticateSync();

        //return the result
        return result;
    }



}
