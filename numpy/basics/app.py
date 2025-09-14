import numpy as np   # numpy import

# 1D Array
arr = np.array([1, 2, 3, 4, 5])
print("1D Array:", arr)

# 2D Array
arr2 = np.array([[1, 2, 3], [4, 5, 6]])
print("2D Array:\n", arr2)

# Zeros & Ones
zeros = np.zeros((2,3))#(row,coloumn)(all no. will 0)
ones = np.ones((3,2))#(row,coloumn)(all no. will be 1)
print("Zeros:\n", zeros)
print("Ones:\n", ones)

# Random numbers
rand_arr = np.random.randint(1, 10, size=(3,3))
print("Random 3x3:\n", rand_arr)

# Math operations
a = np.array([10, 20, 30])
b = np.array([1, 2, 3])

print("Addition:", a + b)
print("Multiplication:", a * b)
print("Square Root:", np.sqrt(a))
print("Mean:", np.mean(a))
print("Square Root:", np.sqrt(b))
