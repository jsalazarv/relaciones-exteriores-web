<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md">
      <q-table title="Empleados" :rows="rows" :columns="columns" row-key="name">
        <template v-slot:top-right>
          <q-btn
            color="dark"
            icon-right="archive"
            label="Exportar"
            size="sm"
            no-caps
            style="border-radius: 8px; margin-right: 0.3rem"
            @click="onExport"
            :loading="isRefetchingReport"
            :disable="isRefetchingReport"
          />
          <q-btn
            color="dark"
            icon-right="add"
            label="Agregar"
            size="sm"
            no-caps
            style="border-radius: 8px"
          />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              dense
              round
              flat
              size="sm"
              color="grey"
              icon="edit"
              @click="onShowModalEdit(props.row)"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              size="sm"
              color="grey"
              icon="delete"
              @click="onShowModalDelete(props.row)"
            ></q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <!-- Edit Dialog -->
    <q-dialog v-model="showEditDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          Editar empleado
        </q-card-section>
        <q-card-section>
          <div class="row">
            <div class="col q-mr-sm">
              <q-input
                outlined
                v-model="selectedEmployee.name"
                label="Nombre"
                stack-label
                :dense="false"
              />
            </div>
            <div class="col">
              <q-input
                outlined
                v-model="selectedEmployee.last_name"
                label="Apellido"
                stack-label
                :dense="false"
              />
            </div>
          </div>

          <q-input
            class="q-mt-sm"
            outlined
            v-model="selectedEmployee.email"
            label="Email"
            stack-label
            :dense="false"
          />
          <q-input
            class="q-mt-sm"
            outlined
            v-model="selectedEmployee.birthday"
            label="Fecha de nacimiento"
            stack-label
            :dense="false"
          />
          <q-input
            class="q-mt-sm"
            outlined
            v-model="selectedEmployee.gender"
            label="Genero"
            stack-label
            :dense="false"
          />
          <q-input
            class="q-mt-sm"
            outlined
            v-model="selectedEmployee.rfc"
            label="RFC"
            stack-label
            :dense="false"
          />
          <q-input
            class="q-mt-sm"
            outlined
            v-model="selectedEmployee.ssn"
            label="NSS"
            stack-label
            :dense="false"
          />
          <q-input
            class="q-mt-sm"
            outlined
            v-model="selectedEmployee.salary"
            label="Salario"
            stack-label
            :dense="false"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Editar"
            color="dark"
            v-close-popup
            @click="onEditSelectedEmployee(selectedEmployee)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Delete Dialog -->
    <q-dialog v-model="showDeleteDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          Eliminar empleado
        </q-card-section>
        <q-card-section>
          <q-avatar
            size="24px"
            icon="signal_wifi_off"
            color="red"
            text-color="white"
          />
          <span class="q-ml-sm">
            Estas seguro de eliminar a {{ selectedEmployee.name }}
            {{ selectedEmployee.last_name }}
          </span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Eliminar"
            color="negative"
            v-close-popup
            @click="onDeleteSelectedEmployee(selectedEmployee)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  useEmployee,
  useEmployeeEdit,
  useEmployeeDelete,
  useEmployeeReport,
} from 'src/composables/useEmployee';
import { IEmployee } from 'src/entities/employee';
import { computed } from 'vue';

const { data, refetch } = useEmployee();
const { mutate: editMutate } = useEmployeeEdit();
const { mutate: deleteMutate } = useEmployeeDelete();
const {
  data: reportData,
  refetch: refetchReport,
  isRefetching: isRefetchingReport,
} = useEmployeeReport();
const showDeleteDialog = ref(false);
const showEditDialog = ref(false);
const selectedEmployee = ref({} as IEmployee);

interface IColum {
  name: string;
  required?: boolean;
  label: string;
  align?: 'left' | 'right' | 'center';
  field: (row: Partial<IEmployee>) => any;
  sortable?: boolean;
}

const columns: IColum[] = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: (row: Partial<IEmployee>) => row.id,
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: (row: Partial<IEmployee>) => row.name,
    sortable: true,
  },
  {
    name: 'last_name',
    align: 'left',
    label: 'Apellido',
    field: (row: Partial<IEmployee>) => row.last_name,
    sortable: true,
  },
  {
    name: 'email',
    align: 'left',
    label: 'Correo',
    field: (row: Partial<IEmployee>) => row.email,
  },
  {
    name: 'birthday',
    align: 'left',
    label: 'Fecha de nacimiento',
    field: (row: Partial<IEmployee>) => row.birthday,
    sortable: true,
  },
  {
    name: 'gender',
    align: 'left',
    label: 'Genero',
    field: (row: Partial<IEmployee>) =>
      row.gender === 'male' ? 'Masculino' : 'Femenino',
    sortable: true,
  },
  {
    name: 'rfc',
    align: 'left',
    label: 'RFC',
    field: (row: Partial<IEmployee>) => row.rfc,
    sortable: true,
  },
  {
    name: 'ssn',
    align: 'left',
    label: 'NSS',
    field: (row: Partial<IEmployee>) => row.ssn,
    sortable: true,
  },
  {
    name: 'salary',
    align: 'left',
    label: 'Salario',
    field: (row: Partial<IEmployee>) => row.salary,
    sortable: true,
  },
  {
    name: 'actions',
    label: 'Acciones',
    field: () => 'actions',
  },
];

const rows = computed(() => {
  return data?.value?.data.map((employee: IEmployee) => ({
    id: employee.id,
    name: employee.name,
    last_name: employee.last_name,
    email: employee.email,
    birthday: employee.birthday,
    gender: employee.gender,
    rfc: employee.rfc,
    ssn: employee.ssn,
    salary: employee.salary,
  }));
});

const onExport = () => {
  console.log('[EXPORT EXCEL]'); //TODO: Implement export
};

const onShowModalEdit = (employee: IEmployee) => {
  showEditDialog.value = true;
  selectedEmployee.value = employee;
};

const onShowModalDelete = (employee: IEmployee) => {
  showDeleteDialog.value = true;
  selectedEmployee.value = employee;
};

const onEditSelectedEmployee = (employee: IEmployee) => {
  editMutate(employee, {
    onSuccess: () => {
      refetch();
    },
  });
  console.log('[EDIT EMPLOYEE]', employee); //TODO: Implement edit
};

const onDeleteSelectedEmployee = (employee: IEmployee) => {
  deleteMutate(employee.id, {
    onSuccess: () => {
      refetch();
    },
  });
};
</script>
