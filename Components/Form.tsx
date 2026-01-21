
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Footer from './Footer';


export default function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [department, setDepartment] = useState(null);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [employeeType, setEmployeeType] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
const [isEditModalVisible, setIsEditModalVisible] = useState(false);
const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const [items, setItems] = useState([
    { label: 'HR', value: 'HR' },
    // { label: 'Development', value: 'Development' },
    { label: 'Testing', value: 'Testing' },
    { label: 'Marketing', value: 'Marketing' },
    { label: 'Sales', value: 'Sales' },
    { label: 'Data', value: 'Data' },
  ]);


  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    const safeName = name.trim();
    const safeEmail = email.trim();
    const safeAge = age.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!safeName) newErrors.name = 'Name is required';
    else if (safeName.length < 3) newErrors.name = 'Min 3 characters';

    if (!safeEmail) newErrors.email = 'Email is required';
    else if (!emailRegex.test(safeEmail))
      newErrors.email = 'Invalid email';

    if (!safeAge) newErrors.age = 'Age is required';
    else if (isNaN(Number(safeAge)) || Number(safeAge) < 18 || Number(safeAge) > 60)
      newErrors.age = 'Age must be 18–60';

    if (!department) newErrors.department = 'Select department';


    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      newErrors.phone = 'Enter valid 10 digit phone number';
    }

    if (!address.trim()) newErrors.address = 'Address required';
    if (!employeeType) newErrors.employeeType = 'Select employee type';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (editId !== null) {
      // UPDATE
      setEmployees(prev =>
        prev.map(emp =>
          emp.id === editId
            ? {
              ...emp,
              name,
              email,
              age,
              phone,
              address,
              employeeType,
              department,
            }
            : emp
        )
      );
      setEditId(null);
    } else {
      // ADD
      const newEmployee = {
        id: Date.now(),
        name,
        email,
        age,
        phone,
        address,
        employeeType,
        department,
      };

      setEmployees(prev => [...prev, newEmployee]);
    }

    // Clear form
    setName('');
    setEmail('');
    setAge('');
    setPhone('');
    setAddress('');
    setEmployeeType('');
    setDepartment(null);
    setErrors({});
  };
  const handleEdit = (item: any) => {
    setName(item.name);
    setEmail(item.email);
    setAge(item.age);
    setPhone(item.phone);
    setAddress(item.address);
    setEmployeeType(item.employeeType);
    setDepartment(item.department);
    setEditId(item.id);
  };

  const handleDelete = (id: number) => {
    Alert.alert('Delete', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: () => {
          setEmployees(prev => prev.filter(emp => emp.id !== id));
          setName('');
          setEmail('');
          setAge('');
          setPhone('');
          setAddress('');
          setEmployeeType('');
          setDepartment(null);
          setErrors({});

        }





      }

    ]);
  };


  return (
    <>

      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>

          <Text style={styles.title}>Employee Registration</Text>

          {/* NAME */}
          <Text style={{ fontWeight: '600', marginBottom: 5 }}>Name</Text>

          <TextInput
            style={[styles.input, errors.name && styles.errorBorder]}
            placeholder="Name"
            value={name}
            onChangeText={(t) => {
              setName(t);
              setErrors(p => ({ ...p, name: null }));
            }}
          />
          {errors.name && <Text style={styles.error}>{errors.name}</Text>}



          <Text style={{ fontWeight: '600', marginBottom: 5 }}>Email</Text>
          <TextInput
            style={[styles.input, errors.email && styles.errorBorder]}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={(t) => {
              setEmail(t);
              setErrors(p => ({ ...p, email: null }));
            }}
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}



          {/* AGE */}
          <Text style={{ fontWeight: '600', marginBottom: 5 }}>Age</Text>

          <TextInput
            style={[styles.input, errors.age && styles.errorBorder]}
            placeholder="Age"
            keyboardType="numeric"
            value={age}
            onChangeText={(text) => {
              setAge(text);

              if (!text.trim()) {
                setErrors(prev => ({ ...prev, age: 'Age is required' }));
              } else if (isNaN(Number(text)) || Number(text) < 18 || Number(text) > 60) {
                setErrors(prev => ({ ...prev, age: 'Age must be 18–60' }));
              } else {
                setErrors(prev => ({ ...prev, age: null }));
              }
            }}
          />

          {errors.age && <Text style={styles.error}>{errors.age}</Text>}


          <Text style={{ fontWeight: '600', marginBottom: 5 }}>Phone No</Text>


          <TextInput
            style={[styles.input, errors.phone && styles.errorBorder]}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={(text) => {
              // Allow only numbers
              const numericValue = text.replace(/[^0-9]/g, '');
              setPhone(numericValue);

              const phoneRegex = /^[6-9]\d{9}$/;

              if (!numericValue) {
                setErrors(prev => ({ ...prev, phone: 'Phone number is required' }));
              } else if (!phoneRegex.test(numericValue)) {
                setErrors(prev => ({ ...prev, phone: 'Enter valid 10-digit phone number' }));
              } else {
                setErrors(prev => ({ ...prev, phone: null }));
              }
            }}
          />
          {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}



          {/* ADDRESS */}
          <Text style={{ fontWeight: '600', marginBottom: 5 }}>Address</Text>

          <TextInput
            style={[styles.input, errors.address && styles.errorBorder]}
            placeholder="Address"
            value={address}
            onChangeText={(t) => {
              setAddress(t);
              setErrors(p => ({ ...p, address: null }));
            }}
          />
          {errors.address && <Text style={styles.error}>{errors.address}</Text>}

          {/* EMPLOYEE TYPE */}
          <Text style={{ fontWeight: '600' }}>Employee Type</Text>
          <View style={styles.radioGroup}>
            {['Full Time', 'Intern', 'Intern (Unpaid)'].map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.radioItem,
                  employeeType === type && styles.radioSelected
                ]}
                onPress={() => {
                  setEmployeeType(type);
                  setErrors(p => ({ ...p, employeeType: null }));
                }}
              >
                <Text>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.employeeType && <Text style={styles.error}>{errors.employeeType}</Text>}

          {/* DEPARTMENT */}
          <DropDownPicker
            open={open}
            value={department}
            items={items}
            setOpen={setOpen}
            setValue={(cb) => {
              const val = cb(department);
              setDepartment(val);
              setErrors(p => ({ ...p, department: null }));
            }}
            setItems={setItems}
            placeholder="Select Department"
          />
          {errors.department && <Text style={styles.error}>{errors.department}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>

          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>
            Employee List
          </Text>

          {employees.map(item => (
            <View key={item.id} style={styles.card}>
              <Text><Text style={{ fontWeight: '600' }}>Name:</Text> {item.name}</Text>
              <Text>Email: {item.email}</Text>
              <Text>Age: {item.age}</Text>
              <Text>Phone: {item.phone}</Text>
              <Text>Dept: {item.department}</Text>
              <Text>Type: {item.employeeType}</Text>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => handleEdit(item)}
                >
                  <Text style={styles.btnText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.btnText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* <Footer /> */}
        </ScrollView>
      </View>

    </>
  );
}











const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9fafb',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 21,
    marginTop: 49,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },

  dropdown: {
    borderColor: '#ccc',
    marginBottom: 15,
  },

  dropdownBox: {
    borderColor: '#ff1717ff',
  },

  button: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 6,
    marginBottom: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  errorBorder: {
    borderColor: 'red',
    borderWidth: 1.5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  radioItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  radioSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#e0e7ff',
  },

  radioText: {
    fontSize: 14,
    color: '#000',
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginVertical: 8,
    elevation: 2,
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  editBtn: {
    backgroundColor: '#22c55e',
    padding: 8,
    borderRadius: 5,
  },

  deleteBtn: {
    backgroundColor: '#ef4444',
    padding: 8,
    borderRadius: 5,
  },

  btnText: {
    color: '#fff',
    fontSize: 13,
  },

});
