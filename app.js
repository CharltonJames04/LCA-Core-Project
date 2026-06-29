const defaultEmployees = [
  { id: 1, name: 'Aisha Jacobs', department: 'Software Development', position: 'Front-End Developer', email: 'aisha@moderntech.co.za', phone: '0821234567', salary: 36000, employmentDate: '2021-02-14', status: 'Active', emergencyContact: 'M. Jacobs - 0832221111', attendanceRate: 96 },
  { id: 2, name: 'Liam Naidoo', department: 'Software Development', position: 'Back-End Developer', email: 'liam@moderntech.co.za', phone: '0834567890', salary: 42000, employmentDate: '2020-07-01', status: 'Active', emergencyContact: 'S. Naidoo - 0845551111', attendanceRate: 94 },
  { id: 3, name: 'Zanele Dlamini', department: 'Quality Assurance', position: 'QA Tester', email: 'zanele@moderntech.co.za', phone: '0841112222', salary: 28000, employmentDate: '2022-03-18', status: 'Active', emergencyContact: 'T. Dlamini - 0823334444', attendanceRate: 91 },
  { id: 4, name: 'Ethan Williams', department: 'Customer Support', position: 'Support Specialist', email: 'ethan@moderntech.co.za', phone: '0812223333', salary: 24000, employmentDate: '2023-01-10', status: 'Active', emergencyContact: 'N. Williams - 0839998888', attendanceRate: 89 },
  { id: 5, name: 'Mia Petersen', department: 'Human Resources', position: 'HR Officer', email: 'mia@moderntech.co.za', phone: '0791234567', salary: 31000, employmentDate: '2019-11-06', status: 'Active', emergencyContact: 'J. Petersen - 0828887777', attendanceRate: 97 },
  { id: 6, name: 'Noah Adams', department: 'Sales', position: 'Sales Executive', email: 'noah@moderntech.co.za', phone: '0762224444', salary: 30000, employmentDate: '2021-08-12', status: 'Active', emergencyContact: 'P. Adams - 0846665555', attendanceRate: 90 },
  { id: 7, name: 'Kayla Mokoena', department: 'Marketing', position: 'Digital Marketer', email: 'kayla@moderntech.co.za', phone: '0783335555', salary: 29500, employmentDate: '2022-06-22', status: 'Active', emergencyContact: 'L. Mokoena - 0811113333', attendanceRate: 93 },
  { id: 8, name: 'Daniel Smith', department: 'Software Development', position: 'Full Stack Developer', email: 'daniel@moderntech.co.za', phone: '0827776666', salary: 46000, employmentDate: '2018-09-03', status: 'Active', emergencyContact: 'R. Smith - 0732221111', attendanceRate: 98 },
  { id: 9, name: 'Thando Khumalo', department: 'Quality Assurance', position: 'Automation Tester', email: 'thando@moderntech.co.za', phone: '0745556666', salary: 34000, employmentDate: '2020-04-20', status: 'Active', emergencyContact: 'B. Khumalo - 0823339999', attendanceRate: 92 },
  { id: 10, name: 'Emma Brown', department: 'Customer Support', position: 'Customer Success Agent', email: 'emma@moderntech.co.za', phone: '0712229999', salary: 23000, employmentDate: '2023-05-15', status: 'Active', emergencyContact: 'K. Brown - 0831112222', attendanceRate: 88 },
  { id: 11, name: 'Sipho Maseko', department: 'Human Resources', position: 'Payroll Administrator', email: 'sipho@moderntech.co.za', phone: '0824445555', salary: 33000, employmentDate: '2021-12-01', status: 'Active', emergencyContact: 'D. Maseko - 0841231234', attendanceRate: 95 },
  { id: 12, name: 'Olivia Johnson', department: 'Marketing', position: 'Content Strategist', email: 'olivia@moderntech.co.za', phone: '0832227777', salary: 30500, employmentDate: '2022-10-09', status: 'Active', emergencyContact: 'A. Johnson - 0797778888', attendanceRate: 94 },
  { id: 13, name: 'Ruan Botha', department: 'Sales', position: 'Account Manager', email: 'ruan@moderntech.co.za', phone: '0605554444', salary: 35500, employmentDate: '2020-02-28', status: 'Active', emergencyContact: 'C. Botha - 0829090909', attendanceRate: 87 },
  { id: 14, name: 'Naledi Nkosi', department: 'Software Development', position: 'UX Designer', email: 'naledi@moderntech.co.za', phone: '0723331111', salary: 38000, employmentDate: '2019-06-17', status: 'Active', emergencyContact: 'F. Nkosi - 0842228888', attendanceRate: 96 },
  { id: 15, name: 'Caleb Daniels', department: 'Quality Assurance', position: 'QA Lead', email: 'caleb@moderntech.co.za', phone: '0734442222', salary: 40000, employmentDate: '2017-03-11', status: 'Active', emergencyContact: 'Y. Daniels - 0815557777', attendanceRate: 99 }
];

const defaultLeaveRequests = [
  { id: 1, employeeId: 3, type: 'Annual Leave', start: '2026-07-01', end: '2026-07-05', reason: 'Family trip', status: 'Pending' },
  { id: 2, employeeId: 6, type: 'Sick Leave', start: '2026-06-28', end: '2026-06-30', reason: 'Medical recovery', status: 'Approved' },
  { id: 3, employeeId: 11, type: 'Family Responsibility', start: '2026-07-04', end: '2026-07-04', reason: 'Family emergency', status: 'Rejected' }
];

const { createApp, nextTick } = Vue;

createApp({
  data() {
    return {
      loggedIn: localStorage.getItem('moderntechLoggedIn') === 'true',
      loginForm: { username: '', password: '' },
      loginError: '',
      page: 'dashboard',
      employees: JSON.parse(localStorage.getItem('employees')) || defaultEmployees,
      leaveRequests: JSON.parse(localStorage.getItem('leaveRequests')) || defaultLeaveRequests,
      search: '',
      departmentFilter: '',
      editingEmployee: null,
      selectedEmployee: null,
      payslip: {},
      employeeForm: {},
      leaveForm: { employeeId: '', type: 'Annual Leave', start: '', end: '', reason: '' },
      departmentChart: null,
      attendanceChart: null,
      departments: ['Software Development', 'Quality Assurance', 'Customer Support', 'Sales', 'Marketing', 'Human Resources']
    };
  },
  computed: {
    filteredEmployees() {
      const q = this.search.toLowerCase();
      return this.employees.filter(e => {
        const matchesSearch = [e.name, e.department, e.position, e.email].join(' ').toLowerCase().includes(q);
        const matchesDept = !this.departmentFilter || e.department === this.departmentFilter;
        return matchesSearch && matchesDept;
      });
    },
    dashboardCards() {
      const approvedLeave = this.leaveRequests.filter(r => r.status === 'Approved').length;
      const pending = this.leaveRequests.filter(r => r.status === 'Pending').length;
      const payroll = this.employees.reduce((total, e) => total + this.calcPayroll(e).net, 0);
      const attendance = this.employees.filter(e => this.attendanceStatus(e) === 'Present').length;
      return [
        { title: 'Total Employees', value: this.employees.length },
        { title: 'Employees on Leave', value: approvedLeave },
        { title: 'Pending Leave Requests', value: pending },
        { title: 'Monthly Payroll', value: this.currency(payroll) },
        { title: 'Present Today', value: attendance }
      ];
    }
  },
  methods: {
    login() {
      if (this.loginForm.username === 'admin' && this.loginForm.password === 'password123') {
        this.loggedIn = true;
        localStorage.setItem('moderntechLoggedIn', 'true');
      } else {
        this.loginError = 'Incorrect username or password.';
      }
    },
    logout() {
      localStorage.removeItem('moderntechLoggedIn');
      this.loggedIn = false;
    },
    saveData() {
      localStorage.setItem('employees', JSON.stringify(this.employees));
      localStorage.setItem('leaveRequests', JSON.stringify(this.leaveRequests));
    },
    currency(value) {
      return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(value || 0);
    },
    calcPayroll(employee) {
      const gross = employee.salary;
      const tax = gross * 0.18;
      const uif = gross * 0.01;
      const medical = 1500;
      const net = gross - tax - uif - medical;
      return { gross, tax, uif, medical, net };
    },
    getEmployeeName(id) {
      const employee = this.employees.find(e => e.id === Number(id));
      return employee ? employee.name : 'Unknown Employee';
    },
    openEmployeeForm(employee = null) {
      this.editingEmployee = employee;
      this.employeeForm = employee ? { ...employee } : {
        id: Date.now(), name: '', department: 'Software Development', position: '', email: '', phone: '', salary: 20000, employmentDate: '', status: 'Active', emergencyContact: '', attendanceRate: 90
      };
      new bootstrap.Modal(document.getElementById('employeeModal')).show();
    },
    saveEmployee() {
      if (this.editingEmployee) {
        const index = this.employees.findIndex(e => e.id === this.editingEmployee.id);
        this.employees[index] = { ...this.employeeForm };
      } else {
        this.employees.push({ ...this.employeeForm });
      }
      this.saveData();
      bootstrap.Modal.getInstance(document.getElementById('employeeModal')).hide();
    },
    deleteEmployee(id) {
      if (confirm('Are you sure you want to delete this employee?')) {
        this.employees = this.employees.filter(e => e.id !== id);
        this.saveData();
      }
    },
    viewEmployee(employee) {
      this.selectedEmployee = employee;
      new bootstrap.Modal(document.getElementById('detailsModal')).show();
    },
    generatePayslip(employee) {
      this.payslip = { employee, ...this.calcPayroll(employee) };
      new bootstrap.Modal(document.getElementById('payslipModal')).show();
    },
    submitLeave() {
      if (new Date(this.leaveForm.end) < new Date(this.leaveForm.start)) {
        alert('End date cannot be before start date.');
        return;
      }
      this.leaveRequests.unshift({ id: Date.now(), ...this.leaveForm, employeeId: Number(this.leaveForm.employeeId), status: 'Pending' });
      this.leaveForm = { employeeId: '', type: 'Annual Leave', start: '', end: '', reason: '' };
      this.saveData();
    },
    updateLeave(request, status) {
      request.status = status;
      this.saveData();
    },
    attendanceStatus(employee) {
      const onLeave = this.leaveRequests.some(r => r.employeeId === employee.id && r.status === 'Approved');
      if (onLeave) return 'On Leave';
      return employee.attendanceRate < 90 ? 'Absent Risk' : 'Present';
    },
    attendanceClass(employee) {
      const status = this.attendanceStatus(employee);
      if (status === 'On Leave') return 'badge bg-info';
      if (status === 'Absent Risk') return 'badge bg-warning text-dark';
      return 'badge bg-success';
    },
    statusClass(status) {
      if (status === 'Approved') return 'badge bg-success';
      if (status === 'Rejected') return 'badge bg-danger';
      return 'badge bg-warning text-dark';
    },
    drawCharts() {
      nextTick(() => {
        const deptCanvas = document.getElementById('departmentChart');
        const attendanceCanvas = document.getElementById('attendanceChart');
        if (!deptCanvas || !attendanceCanvas) return;
        if (this.departmentChart) this.departmentChart.destroy();
        if (this.attendanceChart) this.attendanceChart.destroy();

        const deptCounts = this.departments.map(dept => this.employees.filter(e => e.department === dept).length);
        this.departmentChart = new Chart(deptCanvas, {
          type: 'pie',
          data: { labels: this.departments, datasets: [{ data: deptCounts }] }
        });

        const present = this.employees.filter(e => this.attendanceStatus(e) === 'Present').length;
        const leave = this.employees.filter(e => this.attendanceStatus(e) === 'On Leave').length;
        const risk = this.employees.filter(e => this.attendanceStatus(e) === 'Absent Risk').length;
        this.attendanceChart = new Chart(attendanceCanvas, {
          type: 'bar',
          data: { labels: ['Present', 'On Leave', 'Absent Risk'], datasets: [{ label: 'Employees', data: [present, leave, risk] }] },
          options: { scales: { y: { beginAtZero: true } } }
        });
      });
    }
  }
}).mount('#app');
