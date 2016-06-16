$(document).ready(function(){

      loadUsers();

      /* Online-Offline Toggle Mechanism */

      $("#online").click(function() {
          $(".online").show();
          $(".offline").hide();
      });

      $("#offline").click(function() {
          $(".online").hide();
          $(".offline").show();
      });

      $("#all").click(function() {
          $(".online").show();
          $(".offline").show();
      });

      /* Load users into the page */

      function loadUsers(){

          var channels = ["freecodecamp","storbeck","terakilobyte","habathcx","RobotCaleb","thomasballinger","noobs2ninjas","ESL_SC2","OgamingSC2","brunofin","comster404"] ;

          channels.forEach(function(channel){

              $.when(getChannelDetails(channel),getStreamDetails(channel))
              .done(function(channelData, streamData){
                  var user =  createUser(channel, channelData[0],streamData[0]);
                  addUser(user);
              })
              .fail(function(){
                  var user = createUser(channel);
                  addUser(user);
              });

          });

      }

        /* Get info about Channels */
        function getChannelDetails(channel) {
          return $.getJSON("https://api.twitch.tv/kraken/channels/" + channel);
        }

        /* Get info about Stream of a Channel */
        function getStreamDetails(channel) {
          return $.getJSON("https://api.twitch.tv/kraken/streams/" + channel);
        }

        /* Create User to be loaded to page */
        function createUser(channel, channelData, streamData){

              var user = {};

              if(channelData){
                  user.name = channelData.display_name;
                  user.url = channelData.url;
                  user.logo = channelData.logo || "https://pixabay.com/static/uploads/photo/2014/04/03/00/32/questionmark-308636_960_720.png";

                  if(streamData.stream == null){
                      user.game = "Offline";
                      user.state = "offline";
                      user.color = "red";
                  } else {
                      user.game = "<strong>" + streamData.stream.game + "</strong>";
                      user.state = "online";
                      user.color = "green";
                  }
              }else{
                  user.name = channel;
                  user.game = "Closed";
                  user.logo = "https://pixabay.com/static/uploads/photo/2013/07/12/17/00/remove-151678_960_720.png";
                  user.url = "#";
                  user.state = "offline";
                  user.color = "off";

              }

              return user;
        }

        /* Add User to the webpage */
        function addUser(user) {

        var userTemplate = "<a href ='" + user.url + "' target='_blank'>" + "<div class='row channel " + user.state + "'>" +
                                "<div class= 'col-sm-4 image'>"+"<img src = '" + user.logo + "'/>" + "</div>" +
                                "<div class= 'col-sm-4 name'>"+ "<h3>" + user.name + "</h3>" + "</div>" +
                                "<div class= 'col-sm-2 status'>"  + user.game + "</div>" +
                                "<div class= 'col-sm-2 round color " + user.color + "'/>" + "</div>" +

                            "</div></a>" ;

        $(".channelList").append(userTemplate);


        }


}); // End of Document Ready Function
