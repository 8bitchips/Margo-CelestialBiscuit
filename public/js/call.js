let lastVideo;
var client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
let usersCnt = 0;
var localTracks = {
  videoTrack: null,
  audioTrack: null,
};
var remoteUsers = {};
var options = {
  appid: null,
  channel: null,
  uid: null,
  token: null,
};
$(async () => {
  var urlParams = new URL(location.href).searchParams;
  options.appid = urlParams.get("appid");
  options.channel = urlParams.get("channel");
  options.token = urlParams.get("token");
  options.uid = urlParams.get("uid");
  let res;
  if (!urlParams.get("uid")) {
    res = await axios.post("https://margowomen.herokuapp.com/call/connect", {
      mail: "architgarg603@gmail.com",
    });
  }
  $("#channel").val(options.channel || res.data.id);
  if (options.appid && options.channel) {
    $("#uid").val(options.uid);
    $("#appid").val(options.appid);
    $("#token").val(options.token);
    $("#join-form").submit();
  }
});
$("#join-form").submit(async function (e) {
  e.preventDefault();
  $("#join").attr("disabled", true);
  try {
    options.appid = "29e55ef2413b499287a93d636bfe9979";
    options.token = $("#token").val();
    options.channel = $("#channel").val();
    options.uid = Number($("#uid").val());
    await join();
    if (options.token) {
      $("#success-alert-with-token").css("display", "block");
    } else {
      $("#success-alert a").attr(
        "href",
        `connect?appid=${options.appid}&channel=${options.channel}&token=${options.token}`
      );
      $("#success-alert").css("display", "block");
    }
  } catch (error) {
    console.error(error);
  } finally {
    $("#leave").attr("disabled", false);
  }
});
$("#leave").click(function (e) {
  leave();
  window.location.href = "/";
});
async function join() {
  // Add an event listener to play remote tracks when remote user publishes.
  client.on("user-published", handleUserPublished);
  client.on("user-unpublished", handleUserUnpublished);

  // Join a channel and create local tracks. Best practice is to use Promise.all and run them concurrently.
  [options.uid, localTracks.audioTrack, localTracks.videoTrack] =
    await Promise.all([
      // Join the channel.
      client.join(
        options.appid,
        options.channel,
        options.token || null,
        options.uid || null
      ),
      // Create tracks to the local microphone and camera.
      AgoraRTC.createMicrophoneAudioTrack(),
      AgoraRTC.createCameraVideoTrack(),
    ]);

  // Play the local video track to the local browser and update the UI with the user ID.
  localTracks.videoTrack.play("local-player");

  // Publish the local video and audio tracks to the channel.
  await client.publish(Object.values(localTracks));
  console.log("publish success");
}

async function leave() {
  for (trackName in localTracks) {
    var track = localTracks[trackName];
    if (track) {
      track.stop();
      track.close();
      localTracks[trackName] = undefined;
    }
  }

  // Remove remote users and player views.
  remoteUsers = {};
  $("#remote-playerlist").html("");

  // leave the channel
  await client.leave();

  $("#local-player-name").text("");
  $("#join").attr("disabled", false);
  $("#leave").attr("disabled", true);
}

async function subscribe(user, mediaType) {
  const uid = user.uid;
  // subscribe to a remote user
  await client.subscribe(user, mediaType);
  console.log("subscribe success");
  if (mediaType === "video") {
    const player = $(`
      <div id="other-player player-wrapper-${uid}">
      
        <div id="player-${uid}" class="player"></div>
      </div>
    `);
    $("#remote-playerlist").append(player);
    user.videoTrack.play(`player-${uid}`);

    player.click(function () {
      let main = $("#main");
      let old = main.children();
      if (old.length > 0) {
        let oldId = old[0].id.split("-")[1];
        lastVideo.videoTrack.play(`player-${oldId}`);
        $(`#player-${oldId}`).show();
      }
      main.html("");
      let temp = `<div id="main-${uid}" class="mainPlayer"></div>`;
      main.append(temp);
      user.videoTrack.play(`main-${uid}`);
      lastVideo = user;
      $(`#player-${uid}`).css("display", "none");
      console.log(`player-${uid}`);
    });
    let cnt = $("#main").children();
    if (cnt.length == 0) player.click();
  }
  if (mediaType === "audio") {
    user.audioTrack.play();
  }
}

function handleUserPublished(user, mediaType) {
  $(".head").hide();
  const id = user.uid;
  remoteUsers[id] = user;
  usersCnt++;
  subscribe(user, mediaType);
  if (usersCnt > 1) {
    $("#remote-playerlist").show();
  } else {
    $("#remote-playerlist").hide();
  }
}

function handleUserUnpublished(user) {
  const id = user.uid;
  delete remoteUsers[id];
  delete usersCnt--;
  $(`#player-wrapper-${id}`).remove();
  if (usersCnt > 1) {
    $("#remote-playerlist").show();
  } else {
    $("#remote-playerlist").hide();
    $(".head").show();
  }
}
