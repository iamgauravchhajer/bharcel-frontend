import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import deploymentService from '../../services/deploymentService';

export const fetchLogs = createAsyncThunk('deployments/fetchLogs', async (projectId, { rejectWithValue }) => {
  try {
    return await deploymentService.getLogs(projectId);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchStatus = createAsyncThunk('deployments/fetchStatus', async (projectId, { rejectWithValue }) => {
  try {
    return await deploymentService.getStatus(projectId);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const deploymentSlice = createSlice({
  name: 'deployments',
  initialState: {
    logs: [],
    status: null,
    history: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearLogs: (state) => {
      state.logs = [];
    },
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.logs = action.payload.lines || action.payload;
      })
      .addCase(fetchStatus.fulfilled, (state, action) => {
        state.status = action.payload.status;
      });
  },
});

export const { clearLogs, updateStatus } = deploymentSlice.actions;
export default deploymentSlice.reducer;
