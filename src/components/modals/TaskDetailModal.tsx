import { useState, useEffect } from "react";
import { 
  X, 
  User, 
  Clock, 
  Edit, 
  Share2, 
  Trash2, 
  Paperclip, 
  Download, 
  Send, 
  CheckCircle2,
  Loader2 
} from "lucide-react";
import { Task, TaskComment } from "../../types";
import { getInitials } from "../../utils/avatar";
import { apiService } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

interface TaskDetailModalProps {
  task: Task;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TaskDetailModal({ task, onClose, onEdit, onDelete }: TaskDetailModalProps) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<TaskComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const { user } = useAuth();

  const activity = [
    { action: "mudou o status para", value: "Em Progresso", user: "RC", time: "3h atrás" },
    { action: "adicionou", value: "2 anexos", user: "AS", time: "5h atrás" },
    { action: "atribuiu para", value: "RC", user: "AS", time: "1 dia atrás" },
  ];

  useEffect(() => {
    fetchComments();
  }, [task.id]);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getTaskComments(task.id);
      setComments(data);
    } catch (error) {
      console.error("Erro ao carregar comentários:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!comment.trim() || !user) return;

    try {
      setIsSending(true);
      await apiService.createTaskComment(task.id, {
        content: comment.trim(),
        authorId: user.id,
      });
      setComment("");
      await fetchComments();
    } catch (error) {
      console.error("Erro ao enviar comentário:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await apiService.deleteTaskComment(task.id, commentId);
      await fetchComments();
    } catch (error) {
      console.error("Erro ao excluir comentário:", error);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "agora";
    if (diffMins < 60) return `${diffMins}min atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays < 7) return `${diffDays} dia${diffDays > 1 ? 's' : ''} atrás`;
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-2 py-1 rounded text-xs font-medium text-white ${
                  task.priority === "critical" ? "bg-red-500" :
                  task.priority === "high" ? "bg-orange-500" :
                  task.priority === "medium" ? "bg-blue-500" : "bg-gray-400"
                }`}>
                  {task.priority === "critical" ? "Crítica" : 
                   task.priority === "high" ? "Alta" :
                   task.priority === "medium" ? "Média" : "Baixa"}
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  {task.project}
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{task.name}</h2>
              <p className="text-sm text-gray-600">
                {task.description || "Sem descrição disponível"}
              </p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Responsável:</span>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  {getInitials(task.assignee)}
                </div>
                <span className="text-sm font-medium text-gray-900">{task.assignee || "Não atribuído"}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Prazo: {task.due || "Não definido"}</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              task.status === "done" ? "bg-green-100 text-green-700" :
              task.status === "progress" ? "bg-orange-100 text-orange-700" :
              task.status === "review" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
            }`}>
              {task.status === "done" ? "Concluído" :
               task.status === "progress" ? "Em progresso" :
               task.status === "review" ? "Em revisão" : "A fazer"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="col-span-2 space-y-6">
              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Descrição</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {task.description || "Sem descrição disponível para esta tarefa."}
                  </p>
                </div>
              </div>

              {/* Checklist */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Subtarefas</h3>
                <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
                  {[
                    { text: "Configurar OAuth providers", done: true },
                    { text: "Implementar endpoints de autenticação", done: true },
                    { text: "Criar testes unitários", done: false },
                    { text: "Adicionar documentação", done: false },
                  ].map((item, i) => (
                    <div key={i} className="p-3 flex items-center gap-3 hover:bg-gray-50">
                      <div className={`w-5 h-5 rounded ${
                        item.done ? "bg-green-500" : "border-2 border-gray-300"
                      } flex items-center justify-center`}>
                        {item.done && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                      <span className={`text-sm flex-1 ${item.done ? "text-gray-400 line-through" : "text-gray-900"}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Comentários ({isLoading ? "..." : comments.length})
                </h3>
                
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {comments.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">
                        Nenhum comentário ainda. Seja o primeiro a comentar!
                      </p>
                    ) : (
                      comments.map((c) => (
                        <div key={c.id} className="flex gap-3 group">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                            {getInitials(c.author)}
                          </div>
                          <div className="flex-1">
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-gray-900">{c.author}</span>
                                  <span className="text-xs text-gray-500">{formatTimeAgo(c.createdAt)}</span>
                                </div>
                                {user && c.authorId === user.id && (
                                  <button 
                                    onClick={() => handleDeleteComment(c.id)}
                                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-red-500 transition-all"
                                    title="Excluir comentário"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                              <p className="text-sm text-gray-700">{c.content}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Add Comment */}
                <div className="mt-4 flex gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                    {user ? getInitials(user.name) : "?"}
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Adicionar um comentário..."
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      disabled={isSending}
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <button 
                        onClick={() => setComment("")}
                        className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded"
                        disabled={isSending}
                      >
                        Cancelar
                      </button>
                      <button 
                        onClick={handleSubmitComment}
                        disabled={!comment.trim() || isSending}
                        className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                        Comentar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actions */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Ações</h3>
                <div className="space-y-2">
                  <button 
                    onClick={onEdit}
                    className="w-full px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Editar tarefa
                  </button>
                  <button className="w-full px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Compartilhar
                  </button>
                  <button 
                    onClick={onDelete}
                    className="w-full px-3 py-2 bg-red-50 hover:bg-red-100 rounded text-sm font-medium text-red-700 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Excluir tarefa
                  </button>
                </div>
              </div>

              {/* Attachments */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Anexos ({task.attachments})</h3>
                {task.attachments > 0 ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <Paperclip className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700 flex-1">oauth-flow.png</span>
                      <Download className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <Paperclip className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700 flex-1">requirements.pdf</span>
                      <Download className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Nenhum anexo</p>
                )}
                <button className="w-full mt-3 px-3 py-2 border border-gray-200 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
                  + Adicionar anexo
                </button>
              </div>

              {/* Activity */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Atividade</h3>
                <div className="space-y-3">
                  {activity.map((act, i) => (
                    <div key={i} className="text-xs text-gray-600">
                      <span className="font-medium text-gray-900">{act.user}</span>
                      {' '}{act.action}{' '}
                      <span className="font-medium text-gray-900">{act.value}</span>
                      <p className="text-gray-500 mt-0.5">{act.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
