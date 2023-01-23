/**
 * Author : Ryan
 * Date : 2022-07-27
 * Desc : index
 */

import React, { useCallback } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { useModalStore } from '@libs/zustand';
import NewEstimateTypeModal from './NewEstimateTypeModal';
import SelectBrandModal from './SelectBrandModal';
import SelectDeliveryModal from './SelectDeliveryModal';
import SelectPuropseModal from './SelectPurposeModal';
import EstimateToContinueModal from './EstimateToContinueModal';
import EstimateUploadModal from './EstimateUploadModal';
import EstimateChatModal from './EstimateChatModal';
import DecideDeal from './DecideDeal';

export default function ModalIndex() {
  // Root State
  const { modalType } = useModalStore();

  const renderModal = useCallback(() => {
    switch (modalType) {
      case 'NEW_ESTIMATE_TYPE':
        return <NewEstimateTypeModal />;
      case 'SELECT_BRAND':
        return <SelectBrandModal />;
      case 'SELECT_DELIVERY':
        return <SelectDeliveryModal />;
      case 'SELECT_PURPOSE':
        return <SelectPuropseModal />;
      case 'ESTIMATE_CONTINUE':
        return <EstimateToContinueModal />;
      case 'ESTIMATE_UPLOAD':
        return <EstimateUploadModal />;
      case 'ESTIMATE_CHAT':
        return <EstimateChatModal />;
      case 'DECIDE_DEAL':
        return <DecideDeal />;
    }
  }, [modalType]);

  return <Wrapper>{renderModal()}</Wrapper>;
}

const Wrapper = styled(View)``;
