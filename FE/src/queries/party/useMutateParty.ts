import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as API from '../../api/API';
import { PostParty } from '../../type/partyType';

const postParty = async (party: PostParty) => {
  return await API.post(`/api/parties`, party);
};

type UseCreateComment = {
  onSuccessCb: () => void;
  onErrorCb: () => void;
};

export const useMutateParty = ({ onSuccessCb, onErrorCb }: UseCreateComment) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(postParty, {
    onSuccess: () => {
      onSuccessCb();
      queryClient.invalidateQueries(['parties']);
    },
    onError: () => {
      onErrorCb();
    },
  });

  return { mutation };
};
