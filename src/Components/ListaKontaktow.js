import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListaKontaktow = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    Imie: '',
    Nazwisko: '',
    Email: '',
    Hasło: '',
    Kategoria: 'Służbowy',
    Podkategoria: '',
    Numer: '',
    DataUrodzenia: '',
  });
  const [expandedContactId, setExpandedContactId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:44324/api/kontakty/WyswietlSzczegoly');
      setContacts(response.data);
    } catch (error) {
      console.error('Błąd pobierania kontaktów:', error);
    }
  };

  const handleAddContact = async () => {
    try {
      const response = await axios.post('https://localhost:44324/api/kontakty/AddKontakt', newContact);
      console.log('Dodano kontakt:', response.data);
      setNewContact({
        Imie: '',
        Nazwisko: '',
        Email: '',
        Hasło: '',
        Kategoria: '', 
        Podkategoria: '',
        Numer: '',
        DataUrodzenia: '',
      });
      fetchData(); 
    } catch (error) {
      console.error('Błąd dodawania kontaktu:', error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      const response = await axios.delete(`https://localhost:44324/api/kontakty/UsunKontakt/{id}`);
      console.log('Usunięto kontakt:', response.data);
      fetchData(); 
    } catch (error) {
      console.error('Błąd usuwania kontaktu:', error);
    }
  };

  const handleExpandContact = (id) => {
    setExpandedContactId(id === expandedContactId ? null : id);
  };

  return (
    <div>
      <h2>Kontakty</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.Id}>
            Imie: {contact.imie} Nazwisko: {contact.nazwisko} - Email: {contact.email}
            <button onClick={() => handleDeleteContact(contact.id)}>Usuń</button>
            <button onClick={() => handleExpandContact(contact.Id)}>
              {expandedContactId === contact.Id ? 'Zwiń' : 'Rozwiń'} Szczegóły
            </button>
            {expandedContactId === contact.Id && (
              <div>
                <p>Numer: {contact.numer}</p>
                <p>Data Urodzenia: {contact.dataUrodzenia}</p>
                <p>Kategoria: {contact.kategoria}</p>
                <p>Podkategoria: {contact.podkategoria}</p>
              </div>
            )}
          </li>
        ))}
      </ul>

      <h3>Dodaj nowy kontakt</h3>
      <input
        type="text"
        placeholder="Imię"
        value={newContact.Imie}
        onChange={(e) => setNewContact({ ...newContact, Imie: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nazwisko"
        value={newContact.Nazwisko}
        onChange={(e) => setNewContact({ ...newContact, Nazwisko: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newContact.Email}
        onChange={(e) => setNewContact({ ...newContact, Email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Hasło"
        value={newContact.Hasło}
        onChange={(e) => setNewContact({ ...newContact, Hasło: e.target.value })}
      />
      <select
        value={newContact.Kategoria}
        onChange={(e) => setNewContact({ ...newContact, Kategoria: e.target.value })}
      >
        <option value="Służbowy">Służbowy</option>
        <option value="Prywatny">Prywatny</option>
        <option value="Inny">Inny</option>
      </select>
      <input
        type="text"
        placeholder="Podkategoria"
        value={newContact.Podkategoria}
        onChange={(e) => setNewContact({ ...newContact, Podkategoria: e.target.value })}
      />
      <input
        type="text"
        placeholder="Numer"
        value={newContact.Numer}
        onChange={(e) => setNewContact({ ...newContact, Numer: e.target.value })}
      />
      <input
        type="date"
        placeholder="Data Urodzenia"
        value={newContact.DataUrodzenia}
        onChange={(e) => setNewContact({ ...newContact, DataUrodzenia: e.target.value })}
      />
      <button onClick={handleAddContact}>Dodaj Kontakt</button>
    </div>
  );
};

export default ListaKontaktow;
