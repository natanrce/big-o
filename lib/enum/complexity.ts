export enum Complexity {
  /**
   * Constant time complexity is a type of time complexity where the time
   * taken to complete a function is constant and does not depend on the input size.
   */
  CONSTANT = 'O(1)',
  /**
   * Linear time complexity is a type of time complexity where the time 
   * taken to complete a function is a linear function of the input size.
   */
  LINEAR = 'O(n)',
  /**
   * Quadratic time complexity is a type of time complexity where the time 
   * taken to complete a function is a quadratic function of the input size.
   */
  QUADRATIC = 'O(n^2)',
  /**
   * Cubic time complexity is a type of time complexity where the time 
   * taken to complete a function is a cubic function of the input size.
   */
  CUBIC = 'O(n^3)',
  /**
   * Exponential time complexity is a type of time complexity where the time 
   * taken to complete a function is an exponential function of the input size. 
   */
  EXPONENTIAL = 'O(2^n)',
  /**
   * Logarithmic time complexity is a type of time complexity where the time 
   * taken to complete a function is a logarithmic function of the input size.  
   */
  LOGARITHMIC = 'O(log n)',
  /**
   * Factorial time complexity is a type of time complexity where the time 
   * taken to complete a function is a function of the input size.  
   */
  FACTORIAL = 'O(n!)',
  /**
   * Polynomial time complexity is a type of time complexity where the time 
   * taken to complete a function is a function of the input size.
   */
  POLYNOMIAL = 'O(n^k)',
}