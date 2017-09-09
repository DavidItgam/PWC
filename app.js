var express = require("express");
var bodyParse = require("body-parser");
// Variables para la conexión con MongoDB.
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// URL de conexión con la BD
var url = 'mongodb://localhost:27017/peliculas';
//var url = 'mongodb://david1704:170214@ds127034.mlab.com:27034/aseguradora2';

//var Schema = mongoose.Schema;
var app = express();

var userSchemaJSON = {
    nombre : String,
    apellidos : String,
    email : String,
    password : String
}

//var use_schema = new Schema(userSchemaJSON);

//var User = mongoose.model("User", use_schema);

app.use(express.static('public'));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));

app.set("view engine","jade");

app.get("/",function(req,res){
    res.render("index");
});

app.get("/login",function(req,res){
    res.render("login");
});

app.get("/registro",function(req,res){
    res.render("registro");
});

app.get("/portal",function(req,res){
    res.render("portal");
});


  app.post("/login",function(req,res){
    var log = {
        email: req.body.formEmail,
        password: req.body.formPassword
    };
    // Prueba de conexión con el servidor
    MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connectedectly to server");
    leer(db, function() {
            db.close();
            });
    });
    var  age= proces.argv[2];
    // Pruebas para la lectura de datos insertados
    var leer = function(db, callback) {
    // Carga de la colección de películas.
    var collection = db.collection('usuarios');
  
    // Consulta de los documentos (películas) de la colección
      collection.find({
          age :{
              $gt: +age
          }
    
    
      }).toArray(function(err, res) {

      assert.equal(err, null);
      assert.equal(0, res.length);
      console.log("Seencontrado las siguientes usuario");
      console.dir(res);
      callback(res);
    });
  }
    
});

app.post("/registro",function(req,res){
    var user = {
        nombre: req.body.formFirtsname,
        apellidos: req.body.formLastname,
        email: req.body.formEmail,
        password: req.body.formPassword
    };
    // Prueba de conexión con el servidor
    MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connectedectly to server");
    // Invocación encadenada de las operaciones.
    insertar(db, function() {
        db.close();
        });
    });
    // Prueba para la inserción de datos.
var insertar = function(db, callback) {
    // Carga de la colección de películas.
    var collection = db.collection('usuarios');    
    // Inserción de algunas películas
    collection.insert([user], function(err, docs) {      
      // Log de consola
      console.log("Insertadaslículas en las colección de usuario.");
      res.status(200).send("Registro exitoso Guardado");      
      callback(docs);
    });
  }

});
app.listen(7001);

