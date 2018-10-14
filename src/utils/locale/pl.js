module.exports = {
    // role names
    mafia: p => "Mafia",
    cop: p => "Policjant",
    doctor: p => "Medyk",
    busdriver: p => "Kolejarz",
    jester: p => "Świr",
    sniper: p => "Snajper",
    citizen: p => "Obywatel",

    // commonly used
    close: p => "Zamknij",
    exit: p => "Wyjdź",
    save: p => "Zapisz",
    ok: p => "OK",
    yes: p => "Tak",
    no: p => "Nie",
    cancel: p => "Anuluj",
    password: p => "Hasło",
    you: p => "Ty",
    or: p => "Lub",

    // login screen
    login_hi_there: p => "Hej!",
    login_whats_your_name: p => "Jak się nazywasz?",
    login_name: p => "Imię",
    login_confirm: p => "To ja!",
    no_of_players: p => "Liczba graczy",

    //room list
    roomlist_no_rooms_available: p => "Nie ma dostępnych pokoi.",
    roomlist_create_new_room: p => "Stwórz pokój",
    roomlist_room_name: p => "Nazwa pokoju",
    roomlist_room_password: p => "Hasło Pokoju",
    roomlist_create: p => "Stwórz",
    roomlist_refresh: p => "Odśwież",

    //room lobby
    roomlobby_set_as_speaker: p => "Ustaw głośnik",
    roomlobby_transfer_host: p => "Przekaż hosta",
    roomlobby_kick_the_user: p => "Wyrzuć",
    roomlobby_change_password: p => "Zmień hasło",
    roomlobby_game_settings: p => "Ustawienia gry",
    roomlobby_default_game_settings: p => "Domyślne ustawienia gry",
    roomlobby_start_game: p => "Rozpocznij grę",

    //room lobby admin settings
    roomlobby_mafia_can_frame_itself: p => "Może wrabiać siebie",
    roomlobby_mafia_can_frame_others: p => "Może wrabiać innych",
    roomlobby_mafia_can_kill_mafia: p => "Może zabijać mafię",

    roomlobby_doctor_can_heal_itself: p => "Może leczyć siebie",

    roomlobby_jester_can_pick_everyone: p => "Może wybrać każdego",
    roomlobby_jester_know_each_other: p => "Znają się na wzajem",

    roomlobby_sniper_dies_killing_jester: p => "Ginie zabijając świra",

    //game introduction
    game_you_are_a: p => "Jesteś",
    game_sleepwell: p => "Słodkich snów!",
    game_no_one: p => "Nikt",

    //modal
    modal_uh_oh: p => "O nie!",
    modal_connection_lost: p => "Utracono połączenie!:(",

    modal_happy_lying: p => "Miłego oszukiwania!",

    modal_welcome_back: p => "Witaj z powrotem!",
    modal_do_you_want_to_join_back: p => `Czy chcesz wrócić do pokoju <b>${p[0]}</b>?`,

    modal_leave_the_room: p => "Wyjście z pokoju",
    modal_do_you_want_to_leave_room: p => "Czy na pewno chcesz opuścić ten pokój?",

    modal_transfer_host: p => "Przekazywanie hosta",
    modal_set_as_host: p => `Czy na pewno chcesz ustawić <b>${p[0]}</b> jako nowego hosta tego pokoju?`,

    modal_sadface: p => ";(",
    modal_kicked_out: p => "Zostałeś wyrzucony z pokoju!",

    modal_invalid_password: p => "Niewłaściwe hasło!",
    modal_password_has_to_be_under: p => "Hasło musi mieć poniżej 20 znaków.",

    modal_careful: p => "Ostrożnie!",
    modal_less_users_than_slots_kick: p => `Połączonych jest <b>${p[0]}</b> graczy, a Ty chcesz ustawić grę na <b>${p[1]}</b> graczy. <b>${p[2]}</b> zostanie wyrzuconych. Kontynuować?`,
}