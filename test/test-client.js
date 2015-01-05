module("Serialization tests");
  
  var serializer = new Gossiperl.Client.Serialization.Serializer();
  var clientName = "chrome-test-client";
  var clientPort = 54321;
  var clientSecret = "chrome-client-secret";
  var symmetricKey = "v3JElaRswYgxOt4b";
  var overlayName = "gossiper_overlay_remote";
  var overlayPort = 6666;
  var events = ["member_in", "digestForwardableTest"];

  test("Process", function() {
    var supervisor = new Gossiperl.Client.Supervisor();
    equal(supervisor.getNumberOfConnections(),0);
    var config = {
      overlayName:  overlayName,
      overlayPort:  overlayPort,
      clientName:   clientName,
      clientPort:   clientPort,
      clientSecret: clientSecret,
      symmetricKey: symmetricKey
    };
    supervisor.connect(config);
    equal(supervisor.getNumberOfConnections(),1);
    setTimeout(function() {
      supervisor.subscribe( config.overlayName, events );
      setTimeout(function() {
        supervisor.unsubscribe( config.overlayName, events );
      }, 3000);
    }, 3000);
  });

  /*
  test("Simple serialize / deserialize", function() {
    
    var digest = Gossiperl.Client.getAnnotatedDigest("Digest", {
      name: clientName,
      port: 54321,
      heartbeat: Gossiperl.Client.Util.getTimestamp(),
      id: Gossiperl.Client.Util.getPseudoRandomMessageId(),
      secret: clientSecret
    });
    var serialized = serializer.serialize( digest );
    var deserialized = serializer.deserialize( serialized );
    equal( deserialized.name, clientName );
    equal( deserialized.port, clientPort );
    equal( deserialized.heartbeat, digest.heartbeat );
    equal( deserialized.id, digest.id );
    equal( deserialized.secret, clientSecret );

  });

  test("Serialize / deserialize with encryption", function() {
    
    var aes = new Gossiperl.Client.Encryption.Aes256( symmetricKey );
    var digest = Gossiperl.Client.getAnnotatedDigest("Digest", {
      name: clientName,
      port: 54321,
      heartbeat: Gossiperl.Client.Util.getTimestamp(),
      id: Gossiperl.Client.Util.getPseudoRandomMessageId(),
      secret: clientSecret
    });
    var serialized = serializer.serialize( digest );
    var encrypted = aes.encrypt( serialized );
    var decrypted = aes.decrypt( encrypted );
    var deserialized = serializer.deserialize( decrypted );

    equal( deserialized.name, clientName );
    equal( deserialized.port, clientPort );
    equal( deserialized.heartbeat, digest.heartbeat );
    equal( deserialized.id, digest.id );
    equal( deserialized.secret, clientSecret );
  });
  */