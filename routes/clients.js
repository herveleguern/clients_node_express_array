var clients=[{id:1,nom:'Jean',prenom:'Truc',entreprise:'Orange'}];  //un client par défaut
//clients est tableau [] d'objets JSON {clé:valeur,clé:valeur,...}

exports.index=function(req,res){
    console.log(clients); //voir la structure des données
    res.render("clients/clients.ejs",{clients:clients,nbClients:clients.length});
};
exports.new=function(req,res){
    res.render("clients/new.ejs");
};
exports.create=function(req,res){
    var nom=req.param("nom");
    var prenom=req.param("prenom");
    var entreprise=req.param("entreprise");
    var id=clients.length?clients[clients.length-1].id+1:1;
    var client={id:id,nom:nom,prenom:prenom,entreprise:entreprise};
    console.log(client); //voir la structure des données
    clients.push(client);
    res.redirect("/clients");
};

exports.show=function(req,res){
    var id=req.params.client;
    var client=clients.filter(function(client){
        return (client.id==id);
    })[0];
    console.log(client);//voir la structure des données
    res.render("clients/show.ejs",{client:client});
};

exports.edit=function(req,res){
    //idem show
    var id=req.params.client;
    var client=clients.filter(function(client){
        return (client.id==id);
    })[0];
    res.render("clients/edit.ejs",{client:client});
};

exports.update=function(req,res){
    var nom=req.param("nom");
    var prenom=req.param("prenom");
    var entreprise=req.param("entreprise");
    var id=req.params.client;
    clients.forEach(function(client){
        if(client.id==id){
            client.nom=nom;
            client.prenom=prenom;
            client.entreprise=entreprise;
        }
    });
    res.redirect("/clients");
};
exports.destroy=function(req,res){
    var id=req.params.client;
    clients=clients.filter(function(client){
        return (client.id !=id);
    });
    res.redirect("/clients");
}
