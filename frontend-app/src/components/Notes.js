import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet } from 'react-native';


const NotesApp = () => {
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState([]);

  const handleAddNote = () => {
    if (noteText.trim() !== '') {
      setNotes([...notes, noteText]);
      setNoteText('');
    }
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <View className='flex-1 p-4'>
      <TextInput
        className='border border-gray-300 p-2 mb-4'
        placeholder="Enter a note"
        value={noteText}
        onChangeText={setNoteText}
      />
      <Button title="Add Note" onPress={handleAddNote} />
      <FlatList
        data={notes}
        renderItem={({ item, index }) => (
          <View className='flex-row justify-between items-center mb-4'>
            <Text className='text-base'>{item}</Text>
            <Button title="Delete" onPress={() => handleDeleteNote(index)} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default NotesApp;
