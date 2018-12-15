module.exports = {
    // role names
    mafia: p => "Mafia",
    cop: p => "Cop",
    doctor: p => "Doctor",
    busdriver: p => "Bus Driver",
    jester: p => "Jester",
    sniper: p => "Sniper",
    citizen: p => "Citizen",

    // commonly used
    close: p => "Close",
    exit: p => "Exit",
    save: p => "Save",
    ok: p => "OK",
    yes: p => "Yes",
    no: p => "No",
    cancel: p => "Cancel",
    password: p => "Password",
    ready: p => "Ready",
    you: p => "You",
    or: p => "or",

    // login screen
    login_hi_there: p => "Hi, there.",
    login_whats_your_name: p => "What's your name?",
    login_name: p => "Name",
    login_confirm: p => "That's me!",
    no_of_players: p => "No. of players",

    //room list
    roomlist_no_rooms_available: p => "There are no rooms available.",
    roomlist_create_new_room: p => "Create a new room",
    roomlist_room_name: p => "Room name",
    roomlist_room_password: p => "Room password",
    roomlist_create: p => "Create",
    roomlist_refresh: p => "Refresh",

    //room lobby
    roomlobby_set_as_speaker: p => "Set as speaker",
    roomlobby_transfer_host: p => "Transfer host",
    roomlobby_kick_the_user: p => "Kick the user",
    roomlobby_change_password: p => "Change password",
    roomlobby_game_settings: p => "Game settings",
    roomlobby_default_game_settings: p => "Default game settings",
    roomlobby_start_game: p => "Start game",

    //room lobby admin settings
    roomlobby_mafia_can_frame_itself: p => "Can frame itself",
    roomlobby_mafia_can_frame_others: p => "Can frame others",
    roomlobby_mafia_can_kill_mafia: p => "Can kill mafia",

    roomlobby_doctor_can_heal_itself: p => "Can heal himself",

    roomlobby_jester_can_pick_everyone: p => "Can pick everyone",
    roomlobby_jester_know_each_other: p => "Know each other",

    roomlobby_sniper_dies_killing_jester: p => "Dies by killing jester",

    //game introduction
    game_you_are_a: p => "You are playing as",
    game_sleepwell: p => "Sleep well!",
    game_no_one: p => "No one",





    //modal
    modal_uh_oh: p => "Uh oh!",
    modal_connection_lost: p => "Connection lost!:(",

    modal_happy_lying: p => "Happy lying!",

    modal_welcome_back: p => "Welcome back!",
    modal_do_you_want_to_join_back: p => `Do you want to join the room <b>${p[0]}</b> back?`,

    modal_leave_the_room: p => "Leave the room",
    modal_do_you_want_to_leave_room: p => "Are you sure you want to leave the room?",

    modal_transfer_host: p => "Transfer host",
    modal_set_as_host: p => `Are you sure you want to set <b>${p[0]}</b> as the new host of this room?`,

    modal_sadface: p => ";(",
    modal_kicked_out: p => "You got kicked out of the room!",

    modal_invalid_password: p => "Invalid password!",
    modal_password_has_to_be_under: p => "The password has to be under 20 characters.",

    modal_careful: p => "Careful!",
    modal_less_users_than_slots_kick: p => `There are <b>${p[0]}</b> players connected, and you want to set your game to <b>${p[1]}</b> slots. <b>${p[2]}</b> players will be kicked. Do you really want to do that?`,
}